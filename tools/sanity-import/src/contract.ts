/**
 * The `cms.yaml` contract: one per article package, next to `article.md`.
 * The prose stays in article.md; the contract states what each part becomes
 * in Sanity, so the importer never guesses. Written once per package by the
 * normaliser (`draft`), then checked and edited by a human.
 */

import { z } from 'zod'

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'use YYYY-MM-DD')

export const BLOCKS = [
    'prose',
    'topPicks',
    'comparisonTable',
    'productReviews',
    'typesSection',
    'guideSection',
    'faqSection',
    'decisionTable',
] as const

export const STATUSES = [
    'draft',
    'ready_for_editorial_review',
    'approved_for_publication',
] as const

const Product = z
    .object({
        asin: z.string().regex(/^[A-Z0-9]{10}$/, '10 upper-case letters or digits'),
        /** Product title for a new product document (Sanity requires 10+ characters). */
        title: z.string().min(10),
        brand: z.string().min(1),
        /** Amazon affiliate link. Must match the product record. */
        link: z.string().regex(/^https:\/\//, 'must start with https://'),
        /** Exact H3 text of this product's review in article.md. */
        review_heading: z.string().min(1),
        /** Exact H3 text in the top-picks section, when this product is a top pick. */
        top_pick_heading: z.string().min(1).optional(),
        /** Exact first-column text of this product's comparison-table row. */
        table_label: z.string().min(1).optional(),
        /**
         * Only after a human checks a reported legacy match: the ID of an
         * existing product without an ASIN to reuse, or `none` to create a
         * new product anyway. Leave out when no legacy match was reported.
         */
        legacy_product: z.string().min(1).optional(),
    })
    .strict()

const SectionMap = z
    .object({
        /** Exact H2 text, or `*` for every H2 not listed (last entry only). */
        heading: z.string().min(1),
        block: z.enum(BLOCKS),
        /** faqSection only: emit FAQPage JSON-LD. Off unless the handoff asks. */
        faq_schema: z.boolean().optional(),
        /**
         * typesSection and guideSection only. `h3` (default): one card per H3.
         * `labelled_paragraphs`: each H3 is a group heading, and each paragraph
         * under it that opens with a bold label is one card.
         */
        cards: z.enum(['h3', 'labelled_paragraphs']).optional(),
    })
    .strict()

export const Contract = z
    .object({
        version: z.literal(1),
        status: z.enum(STATUSES),
        approved_by: z.string().min(1).optional(),
        approved_at: isoDate.optional(),
        /** Final URL segment. The category supplies the rest of the path. */
        slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'lower-case words joined by hyphens'),
        /** Sanity category slug. */
        category: z.string().min(1),
        /** Sanity author slug. */
        author: z.string().min(1),
        article_format: z.enum(['product_guide', 'editorial']),
        /** Hero badge. */
        badge: z.string().min(1),
        /** The H1. Must equal the H1 in article.md. */
        title: z.string().min(1),
        seo: z
            .object({
                meta_title: z.string().min(1),
                meta_description: z.string().min(1),
                keywords: z.array(z.string().min(1)),
                indexable: z.boolean(),
            })
            .strict(),
        dates: z
            .object({
                /** `keep` leaves an existing article's date alone. */
                published: z.union([z.literal('keep'), isoDate]),
                reviewed: isoDate.optional(),
            })
            .strict(),
        hero_image: z
            .object({ file: z.string().min(1), alt: z.string().min(1) })
            .strict()
            .optional(),
        products: z.array(Product),
        sections: z.array(SectionMap).min(1),
        /** Open questions for a human. Validation fails until this is empty. */
        needs_review: z.array(z.string()),
    })
    .strict()

export type Contract = z.infer<typeof Contract>
export type ContractProduct = z.infer<typeof Product>
export type ContractSection = z.infer<typeof SectionMap>
