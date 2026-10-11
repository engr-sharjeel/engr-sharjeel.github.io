import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string(),
    shortTitle: z.string(),
    category: z.enum(['Electric mobility', 'Power systems', 'Embedded systems', 'Electronics', 'Software', 'Engineering practice']),
    group: z.enum(['showcase', 'academic']),
    summary: z.string(),
    status: z.string(),
    flagship: z.boolean().default(false),
    technologies: z.array(z.string()),
    overview: z.string(),
    problem: z.string().optional(),
    context: z.string().optional(),
    constraints: z.array(z.string()).default([]),
    lessons: z.array(z.string()).default([]),
    nextSteps: z.array(z.string()).default([]),
    approach: z.array(z.string()),
    components: z.array(z.string()),
    outcomes: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string(), basis: z.enum(['Design estimate', 'Reported prototype result']) })).default([]),
    credits: z.array(z.string()).default([]),
    images: z.array(z.object({
      src: image(),
      kind: z.enum(['photo', 'diagram', 'schematic', 'flowchart', 'poster', 'concept']),
      alt: z.string().min(8),
      caption: z.string(),
      focalPoint: z.string().default('50% 50%'),
    })).default([]),
    provenance: z.array(z.string()).min(1),
    evidenceNotes: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});

export const collections = { projects };
