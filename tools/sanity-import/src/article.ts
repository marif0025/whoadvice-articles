/**
 * Reads an article package's `article.md` into sections. It finds structure
 * only; it never decides what a section is. That is the contract's job.
 */

export type Block = {
    heading: string
    /** 1-based line number of the heading in article.md. */
    line: number
    lines: string[]
}

export type Section = Block & {
    /** Lines between the H2 and its first H3. */
    intro: string[]
    subsections: Block[]
}

export type Article = {
    h1: string
    /** `**Label:** value` lines before the first H2, including inside comments. */
    fields: Record<string, string>
    /** Prose between the H1 and the first H2, without field lines. */
    intro: string[]
    sections: Section[]
}

export type Table = {
    header: string[]
    rows: string[][]
    /** 1-based line number of the header row, relative to the lines searched. */
    line: number
}

const FENCE = /^(```|~~~)/
const FIELD = /^>?\s*\*\*([^*]+?):\*\*\s*(.*)$/

/** Blank out HTML comments, single- or multi-line, keeping line numbers. */
export function stripComments(lines: string[]): string[] {
    const out: string[] = []
    let inComment = false

    for (const line of lines) {
        let rest = line
        let kept = ''
        while (rest.length > 0) {
            if (inComment) {
                const end = rest.indexOf('-->')
                if (end < 0) {
                    rest = ''
                } else {
                    rest = rest.slice(end + 3)
                    inComment = false
                }
            } else {
                const start = rest.indexOf('<!--')
                if (start < 0) {
                    kept += rest
                    rest = ''
                } else {
                    kept += rest.slice(0, start)
                    rest = rest.slice(start + 4)
                    inComment = true
                }
            }
        }
        out.push(kept.trim() === '' ? '' : kept)
    }

    return out
}

export function parseArticle(text: string): Article {
    const raw = text.replace(/\r\n?/g, '\n').split('\n')
    const lines = stripComments(raw)

    let inFence = false
    const fenced = lines.map((line) => {
        if (FENCE.test(line.trim())) {
            inFence = !inFence
            return true
        }
        return inFence
    })

    const isHeading = (index: number, level: number) =>
        !fenced[index] && lines[index].startsWith(`${'#'.repeat(level)} `)

    const h1Index = lines.findIndex((_, i) => isHeading(i, 1))
    const firstH2 = lines.findIndex((_, i) => isHeading(i, 2))
    const preambleEnd = firstH2 < 0 ? lines.length : firstH2

    const fields: Record<string, string> = {}
    for (const line of raw.slice(0, preambleEnd)) {
        const match = line.trim().match(FIELD)
        if (match && !(match[1].trim() in fields)) {
            fields[match[1].trim()] = match[2].trim()
        }
    }

    const intro = lines
        .slice(h1Index + 1, preambleEnd)
        .filter((line) => !FIELD.test(line.trim()))

    const sections: Section[] = []
    let current: Section | undefined
    let sub: Block | undefined

    for (let i = preambleEnd; i < lines.length; i++) {
        const line = lines[i]
        if (isHeading(i, 2)) {
            current = {
                heading: line.slice(3).trim(),
                line: i + 1,
                lines: [],
                intro: [],
                subsections: [],
            }
            sections.push(current)
            sub = undefined
            continue
        }
        if (!current) continue
        if (isHeading(i, 3)) {
            sub = { heading: line.slice(4).trim(), line: i + 1, lines: [] }
            current.subsections.push(sub)
            current.lines.push(line)
            continue
        }
        current.lines.push(line)
        if (sub) sub.lines.push(line)
        else current.intro.push(line)
    }

    return {
        h1: h1Index < 0 ? '' : lines[h1Index].slice(2).trim(),
        fields,
        intro,
        sections,
    }
}

function splitRow(line: string): string[] {
    const body = line.trim().replace(/^\|/, '').replace(/\|$/, '')
    const cells: string[] = []
    let cell = ''
    for (let i = 0; i < body.length; i++) {
        if (body[i] === '\\' && body[i + 1] === '|') {
            cell += '|'
            i++
        } else if (body[i] === '|') {
            cells.push(cell.trim())
            cell = ''
        } else {
            cell += body[i]
        }
    }
    cells.push(cell.trim())
    return cells
}

/** GFM tables: a header row, a separator row, then data rows. */
export function findTables(lines: string[]): Table[] {
    const tables: Table[] = []
    let i = 0
    while (i < lines.length) {
        const isRow = (index: number) => lines[index]?.trim().startsWith('|')
        const isSeparator = (index: number) =>
            /^\|?\s*:?-{3,}/.test(lines[index]?.trim() ?? '')

        if (isRow(i) && isSeparator(i + 1)) {
            const header = splitRow(lines[i])
            const rows: string[][] = []
            let j = i + 2
            while (j < lines.length && isRow(j)) {
                rows.push(splitRow(lines[j]))
                j++
            }
            tables.push({ header, rows, line: i + 1 })
            i = j
        } else {
            i++
        }
    }
    return tables
}

/** Value of a `**Label:**` line (or `**Label**`), backticks removed. */
export function labelledValue(lines: string[], label: string): string | undefined {
    const pattern = new RegExp(`^\\*\\*${escape(label)}:?\\*\\*:?\\s*(.*)$`)
    for (const line of lines) {
        const match = line.trim().match(pattern)
        if (match) return match[1].replace(/`/g, '').trim()
    }
    return undefined
}

/** The `- item` lines that follow a `**Label:**` line. */
export function labelledList(lines: string[], label: string): string[] | undefined {
    const pattern = new RegExp(`^\\*\\*${escape(label)}:?\\*\\*:?\\s*$`)
    const start = lines.findIndex((line) => pattern.test(line.trim()))
    if (start < 0) return undefined

    const items: string[] = []
    for (const line of lines.slice(start + 1)) {
        const trimmed = line.trim()
        if (trimmed === '') continue
        const item = trimmed.match(/^[-*]\s+(.+)$/)
        if (!item) break
        items.push(item[1].trim())
    }
    return items
}

/** Markdown links as `{ text, url }`, in order. */
export function markdownLinks(lines: string[]): { text: string; url: string }[] {
    const links: { text: string; url: string }[] = []
    for (const line of lines) {
        for (const match of line.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)) {
            links.push({ text: match[1], url: match[2] })
        }
    }
    return links
}

/** Accent-, case- and punctuation-insensitive form, for matching names. */
export function normalizeName(value: string): string {
    return value
        .normalize('NFKD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
}

function escape(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
