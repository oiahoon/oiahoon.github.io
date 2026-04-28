import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
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
    publishedDate: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (data.draft || data.type !== 'photography') return;

    const invalidText = new Set(['undefined', 'null', 'untitled', '未命名作品']);
    const hasText = (value: unknown) => {
      const text = String(value || '').trim();
      return text.length > 0 && !invalidText.has(text.toLowerCase());
    };

    if (!hasText(data.title)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['title'],
        message: 'published photography posts need a concrete title',
      });
    }

    if (!hasText(data.description)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['description'],
        message: 'published photography posts need a description',
      });
    }

    if (!hasText(data.location)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['location'],
        message: 'published photography posts need a location',
      });
    }

    const gallery = data.gallery || [];
    if (gallery.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['gallery'],
        message: 'published photography posts need at least one gallery image',
      });
    }

    gallery.forEach((item, index) => {
      if (!hasText(item.alt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['gallery', index, 'alt'],
          message: 'published photography images need meaningful alt text',
        });
      }

      if (!hasText(item.caption)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['gallery', index, 'caption'],
          message: 'published photography images need captions',
        });
      }

      if (!item.width || !item.height) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['gallery', index],
          message: 'published photography images need width and height',
        });
      }
    });
  }),
});

export const collections = {
  posts: postsCollection,
};
