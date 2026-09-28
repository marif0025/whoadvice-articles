/**
 * Sanity connection settings. The project ID and the write token come from
 * the blog's env file (default ~/personal/blog/.env), so this tool holds no
 * credentials of its own. The token is never printed.
 */

import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

import { createClient, type SanityClient } from '@sanity/client'

export const API_VERSION = '2025-02-19'
export const DEFAULT_ENV_FILE = join(homedir(), 'personal/blog/.env')
export const DEFAULT_BLOG_DIR = join(homedir(), 'personal/blog')

export type Connection = {
    projectId: string
    dataset: string
    client: SanityClient
}

function readEnvFile(file: string): Record<string, string> {
    if (!existsSync(file)) throw new Error(`env file not found: ${file}`)
    const values: Record<string, string> = {}
    for (const raw of readFileSync(file, 'utf8').split(/\r?\n/)) {
        const line = raw.trim()
        if (!line || line.startsWith('#')) continue
        const separator = line.indexOf('=')
        if (separator < 1) continue
        let value = line.slice(separator + 1).trim()
        if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1)
        values[line.slice(0, separator).trim()] = value
    }
    return values
}

export function connect(dataset: string, envFile = DEFAULT_ENV_FILE): Connection {
    const env = { ...readEnvFile(envFile), ...process.env }
    const projectId = env.SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const token = env.SANITY_API_WRITE_TOKEN
    if (!projectId) throw new Error(`no SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID in ${envFile}`)
    if (!token) throw new Error(`no SANITY_API_WRITE_TOKEN in ${envFile}`)

    const client = createClient({
        projectId,
        dataset,
        apiVersion: API_VERSION,
        token,
        useCdn: false,
        perspective: 'raw',
    })
    return { projectId, dataset, client }
}
