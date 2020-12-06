import { PostOrPage } from '@tryghost/content-api';

export const getFrontMatter = (post: PostOrPage): string => {
  return `---
title: ${post.title}
description: ${post.meta_description}
published: true
featured: ${post.featured}
feature_image: ${post.feature_image}
published_at: ${post.published_at}
reading_time: ${post.reading_time}
slug: ${post.slug}
---\n\n`;
};
