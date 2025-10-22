import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    author: z.string().default('Joey'),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['zh', 'en']).default('zh'),
    header_img: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    // Photography specific fields
    type: z.enum(['article', 'photography']).default('article'),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
    })).optional(),
    camera: z.object({
      model: z.string().optional(),
      lens: z.string().optional(),
      settings: z.string().optional(),
    }).optional(),
    location: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
