/**
 * Extract the first image from markdown content
 */
export function extractFirstImage(content: string): string | null {
  // Match markdown image syntax: ![alt](src)
  const markdownImageRegex = /!\[.*?\]\(([^)]+)\)/;
  const match = content.match(markdownImageRegex);
  
  if (match && match[1]) {
    return match[1];
  }
  
  // Match HTML img tags: <img src="..." />
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const htmlMatch = content.match(htmlImageRegex);
  
  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1];
  }
  
  return null;
}

/**
 * Get preview image for a post
 * Priority: header_img > gallery[0] > first image in content
 */
interface PreviewPost {
  body?: string;
  data: {
    header_img?: string;
    type?: string;
    gallery?: Array<{ src: string }>;
  };
}

export function getPreviewImage(post: PreviewPost): string | null {
  const { header_img, gallery, type } = post.data;
  
  // 1. Custom header image (highest priority)
  if (header_img) {
    return header_img;
  }
  
  // 2. First gallery image for photography posts
  if (type === 'photography' && gallery && gallery.length > 0) {
    return gallery[0].src;
  }
  
  // 3. First image in content
  if (post.body) {
    return extractFirstImage(post.body);
  }
  
  return null;
}
