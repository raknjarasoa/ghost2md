import { Params } from '@tryghost/content-api';

import * as ContentAPI from './content-api';
import { setCodeInjections } from './tool/set-codeinjections';
import { transformCodeinjection } from './tool/transform-codeinjection';
import { writeJson } from './tool/write-json';

const postAndPageFetchOptions: Params = {
  limit: 'all',
  include: ['tags', 'authors', 'count.posts'],
  formats: ['html', 'plaintext'],
};

const tagAndAuthorFetchOptions: Params = {
  limit: 'all',
  include: 'count.posts',
};

const ignoreNotFoundElseRethrow = (err: any) => {
  if (err && err.response && err.response.status !== 404) {
    throw err;
  }
  return [];
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

  const fetchPosts = api.posts
    .browse(postAndPageFetchOptions)
    .then(posts => {
      posts = transformCodeinjection(posts);
      return posts;
    })
    .catch(ignoreNotFoundElseRethrow);

  const fetchPages = api.pages
    .browse(postAndPageFetchOptions)
    .catch(ignoreNotFoundElseRethrow);
  const fetchTags = api.tags
    .browse(tagAndAuthorFetchOptions)
    .catch(ignoreNotFoundElseRethrow);
  const fetchAuthors = api.authors
    .browse(tagAndAuthorFetchOptions)
    .catch(ignoreNotFoundElseRethrow);
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

  posts.forEach(async post => await writeJson('posts', post));
  pages.forEach(async page => await writeJson('pages', page));
  tags.forEach(async tag => await writeJson('tags', tag));
  authors.forEach(async author => await writeJson('authors', author));

  await writeJson('settings', { ...settings, slug: 'settings' });

  return Promise.resolve(ghostContents);
};
