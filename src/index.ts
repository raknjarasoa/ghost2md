import { Params } from '@tryghost/content-api';
import * as ContentAPI from './content-api';
import { convertToMarkdown } from './tool/convert-html-to-md';
import { getFrontMatter } from './tool/get-front-matter';
import { setCodeInjections } from './tool/set-codeinjections';
import { transformCodeinjection } from './tool/transform-codeinjection';
import { writeJson, writeToMarkdown } from './tool/write-json';

const postAndPageFetchOptions: Params = {
  limit: 'all',
  include: ['tags', 'authors', 'count.posts'],
  formats: ['html'],
};

const tagAndAuthorFetchOptions: Params = {
  limit: 'all',
  include: 'count.posts',
};

/**
 * Create Live Ghost Nodes
 * Uses the Ghost Content API to fetch all posts, pages, tags, authors and settings
 * Creates nodes for each record, so that they are all available to Gatsby
 */
export const fetchContent = async (
  configOptions: ContentAPI.ContentAPIOptions
) => {
  const api = ContentAPI.configure(configOptions);

  const fetchPosts = api.posts.browse(postAndPageFetchOptions).then(posts => {
    posts = transformCodeinjection(posts);
    return posts;
  });

  const fetchPages = api.pages.browse(postAndPageFetchOptions);

  const fetchTags = api.tags.browse(tagAndAuthorFetchOptions);

  const fetchAuthors = api.authors.browse(tagAndAuthorFetchOptions);

  const fetchSettings = api.settings.browse().then(setting => {
    setting = setCodeInjections(setting);
    return setting;
  });

  const ghostContents = await Promise.all([
    fetchPosts,
    fetchPages,
    fetchTags,
    fetchAuthors,
    fetchSettings,
  ]);

  const [posts, pages, tags, authors, settings] = ghostContents;

  posts.forEach(async post => {
    const fontMatter = getFrontMatter(post);
    const markdown = convertToMarkdown(post.html as string);
    await writeToMarkdown('posts', post.slug, fontMatter + markdown);
    await writeJson('posts', post);
  });
  pages.forEach(async page => await writeJson('pages', page));
  tags.forEach(async tag => await writeJson('tags', tag));
  authors.forEach(async author => await writeJson('authors', author));

  await writeJson('settings', { ...settings, slug: 'settings' });

  return Promise.resolve(ghostContents);
};
