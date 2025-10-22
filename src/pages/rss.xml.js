import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  
  return rss({
    title: "Joey's Notes | 黄药师的笔记本",
    description: "积累一些知识和笔记在这里，以供自己和他人参考。摄影和爱猫一样重要，代码的灵性在于生活的感悟。",
    site: context.site,
    items: sortedPosts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.subtitle || post.data.description || post.data.title,
      link: `/posts/${post.slug}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
