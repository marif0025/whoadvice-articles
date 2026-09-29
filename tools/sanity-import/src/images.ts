/**
 * Article images. A line holding only `![alt](images/file.png)` in a prose
 * section becomes an `iimage` block (sanity/schemas/components/image.ts in
 * the blog). The asset ID is worked out from the file itself, the way Sanity
 * names an uploaded image: `image-<sha1>-<width>x<height>-<ext>`. So the plan
 * is exact before anything is uploaded, and apply refuses if the upload comes
 * back under any other ID (the file changed since the plan, or Sanity named
 * it differently).
 */

import { createHash } from 'node:crypto'

/** `![alt](file)` or `![alt](file "caption")`, alone on its line. */
export const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/

export type ImageRef = { alt: string; file: string; caption?: string; line: number }

/** Every image line in article.md, with its 1-based line number. */
export function findImages(articleText: string): ImageRef[] {
    return articleText.split('\n').flatMap((text, index) => {
        const match = text.trim().match(IMAGE_LINE)
        if (!match) return []
        const caption = match[3]?.trim()
        return [{ alt: match[1].trim(), file: match[2], ...(caption ? { caption } : {}), line: index + 1 }]
    })
}

export class ImageError extends Error {}

function dimensions(bytes: Buffer, file: string): { width: number; height: number; ext: string } {
    // PNG: IHDR width and height at bytes 16 and 20.
    if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
        return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), ext: 'png' }
    }
    // WebP: RIFF....WEBP, then a VP8X, VP8L or VP8 chunk.
    if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
        const chunk = bytes.toString('ascii', 12, 16)
        if (chunk === 'VP8X') {
            return { width: bytes.readUIntLE(24, 3) + 1, height: bytes.readUIntLE(27, 3) + 1, ext: 'webp' }
        }
        if (chunk === 'VP8L') {
            const bits = bytes.readUInt32LE(21)
            return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1, ext: 'webp' }
        }
        if (chunk === 'VP8 ') {
            return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff, ext: 'webp' }
        }
    }
    // JPEG: walk the segments to the first start-of-frame marker.
    if (bytes[0] === 0xff && bytes[1] === 0xd8) {
        let offset = 2
        while (offset + 9 < bytes.length) {
            if (bytes[offset] !== 0xff) break
            const marker = bytes[offset + 1]
            const length = bytes.readUInt16BE(offset + 2)
            if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
                return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5), ext: 'jpg' }
            }
            offset += 2 + length
        }
    }
    throw new ImageError(`${file}: not a PNG, WebP or JPEG the importer can read`)
}

export function assetIdFor(bytes: Buffer, file: string): string {
    const { width, height, ext } = dimensions(bytes, file)
    const sha1 = createHash('sha1').update(bytes).digest('hex')
    return `image-${sha1}-${width}x${height}-${ext}`
}
