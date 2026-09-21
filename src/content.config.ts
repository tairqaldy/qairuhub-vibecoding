import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// File layout: src/content/{lessons,labs}/{en,kk}/NN-slug.mdx  ->  entry id "en/NN-slug"
const base = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  /** one sentence, starts with a verb: "explain what vibe coding is and is not" */
  objective: z.string(),
  description: z.string().max(200),
  /** short label for the downloadable/takeaway artifact of this page */
  artifact: z.string().optional(),
  updated: z.string().optional(),
});

const lessons = defineCollection({
  loader: glob({ base: './src/content/lessons', pattern: '{en,kk}/*.mdx' }),
  schema: base,
});

const labs = defineCollection({
  loader: glob({ base: './src/content/labs', pattern: '{en,kk}/*.mdx' }),
  schema: base.extend({
    /** what the learner needs before starting */
    prerequisites: z.array(z.string()).default([]),
    /** "you are done when…" */
    doneWhen: z.string(),
  }),
});

export const collections = { lessons, labs };
