// Writes a labelled placeholder PNG for an article image that isn't made yet,
// so the page shows where the image goes. Each label gives different bytes,
// so each placeholder imports as its own Sanity asset.
//
//   node scripts/placeholder-png.mjs <out.png> "LINE ONE" ["LINE TWO" ...]
//
// 1600x900 (16:9), stone background, dashed border, 5x7 bitmap text.

import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const [out, ...lines] = process.argv.slice(2)
if (!out || lines.length === 0) {
    console.error('usage: node scripts/placeholder-png.mjs <out.png> "LINE ONE" ["LINE TWO" ...]')
    process.exit(1)
}

const W = 1600
const H = 900
const BG = [245, 245, 244] // stone-100
const INK = [120, 113, 108] // stone-500
const EDGE = [168, 162, 158] // stone-400

// 5x7 glyphs, one string per row, '#' = on.
const FONT = {
    A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
    C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
    D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
    E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
    F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
    G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.####'],
    H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
    J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
    K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
    L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
    M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
    N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
    O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
    Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
    R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
    S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
    T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
    U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
    W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
    X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
    Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
    Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
    0: ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
    1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
    2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
    3: ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'],
    4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
    5: ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
    6: ['.###.', '#....', '#....', '####.', '#...#', '#...#', '.###.'],
    7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
    8: ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
    9: ['.###.', '#...#', '#...#', '.####', '....#', '....#', '.###.'],
    ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
    '-': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
    '.': ['.....', '.....', '.....', '.....', '.....', '.##..', '.##..'],
    ':': ['.....', '.##..', '.##..', '.....', '.##..', '.##..', '.....'],
    '/': ['....#', '....#', '...#.', '..#..', '.#...', '#....', '#....'],
}

const px = Buffer.alloc(W * H * 3)
const set = (x, y, [r, g, b]) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return
    const i = (y * W + x) * 3
    px[i] = r
    px[i + 1] = g
    px[i + 2] = b
}
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) set(x, y, BG)

// Dashed border, 40px in.
for (let t = 0; t < 4; t++) {
    for (let x = 40; x < W - 40; x++) if (Math.floor(x / 24) % 2 === 0) {
        set(x, 40 + t, EDGE)
        set(x, H - 41 - t, EDGE)
    }
    for (let y = 40; y < H - 40; y++) if (Math.floor(y / 24) % 2 === 0) {
        set(40 + t, y, EDGE)
        set(W - 41 - t, y, EDGE)
    }
}

// Text: first line larger, the rest smaller, centred as a block.
const scales = lines.map((_, i) => (i === 0 ? 10 : 6))
const heights = scales.map((s) => 7 * s)
const gap = 36
const total = heights.reduce((a, b) => a + b, 0) + gap * (lines.length - 1)
let top = Math.round((H - total) / 2)
lines.forEach((raw, i) => {
    const text = raw.toUpperCase()
    const s = scales[i]
    const advance = 6 * s
    const width = text.length * advance - s
    let left = Math.round((W - width) / 2)
    for (const ch of text) {
        const glyph = FONT[ch]
        if (!glyph) throw new Error(`no glyph for "${ch}"`)
        glyph.forEach((row, gy) => {
            for (let gx = 0; gx < 5; gx++) {
                if (row[gx] !== '#') continue
                for (let dy = 0; dy < s; dy++) for (let dx = 0; dx < s; dx++) set(left + gx * s + dx, top + gy * s + dy, INK)
            }
        })
        left += advance
    }
    top += heights[i] + gap
})

// PNG: 8-bit RGB, filter 0 per row.
const raw = Buffer.alloc((W * 3 + 1) * H)
for (let y = 0; y < H; y++) px.copy(raw, y * (W * 3 + 1) + 1, y * W * 3, (y + 1) * W * 3)

const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    return c >>> 0
})
const crc = (buf) => {
    let c = 0xffffffff
    for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8)
    return (c ^ 0xffffffff) >>> 0
}
const chunk = (type, data) => {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
    const sum = Buffer.alloc(4)
    sum.writeUInt32BE(crc(body))
    return Buffer.concat([len, body, sum])
}
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0)
ihdr.writeUInt32BE(H, 4)
ihdr[8] = 8
ihdr[9] = 2

writeFileSync(
    out,
    Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        chunk('IHDR', ihdr),
        chunk('IDAT', deflateSync(raw, { level: 9 })),
        chunk('IEND', Buffer.alloc(0)),
    ]),
)
console.log(`wrote ${out} (${W}x${H})`)
