export interface BlogPostStructuredData {
  title: string;
  description?: string;
  author: string;
  date: Date;
  image?: string;
  url: string;
  tags?: string[];
  type?: 'article' | 'photography';
}

export function generateBlogPostStructuredData(data: BlogPostStructuredData) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": data.type === 'photography' ? "Photograph" : "BlogPosting",
    "headline": data.title,
    "description": data.description || data.title,
    "author": {
      "@type": "Person",
      "name": data.author,
      "url": "https://notes.miaowu.org/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Joey's Notes",
      "url": "https://notes.miaowu.org",
      "logo": {
        "@type": "ImageObject",
        "url": "https://notes.miaowu.org/icons/512.png"
      }
    },
    "datePublished": data.date.toISOString(),
    "dateModified": data.date.toISOString(),
    "url": data.url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    }
  };

  if (data.image) {
    structuredData["image"] = {
      "@type": "ImageObject",
      "url": data.image.startsWith('http') ? data.image : `https://notes.miaowu.org${data.image}`
    };
  }

  if (data.tags && data.tags.length > 0) {
    structuredData["keywords"] = data.tags.join(", ");
  }

  return JSON.stringify(structuredData);
}

export function generateWebsiteStructuredData() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Joey's Notes",
    "description": "黄药师的个人技术博客 - 分享软件开发经验、技术心得和摄影作品",
    "url": "https://notes.miaowu.org",
    "author": {
      "@type": "Person",
      "name": "Joey",
      "url": "https://notes.miaowu.org/about"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://notes.miaowu.org/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });
}
