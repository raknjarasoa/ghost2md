import _ from 'lodash';

import { parseCodeinjection } from './parse-codeinjection';

/**
 * Extracts specific tags from the code injection header and footer and
 * transforms posts to include extracted tags as a new key and value in the post object.
 *
 * Only the `codeinjection_styles` key is added at present.
 */
export const transformCodeinjection = (posts: any) => {
  posts.map((post: any) => {
    const allCodeinjections = [
      post.codeinjection_head,
      post.codeinjection_foot,
    ].join('');

    if (!allCodeinjections) {
      return post;
    }

    const headInjection = parseCodeinjection(allCodeinjections);

    if (_.isEmpty(post.codeinjection_styles)) {
      post.codeinjection_styles = headInjection.styles;
    } else {
      post.codeinjection_styles += headInjection.styles;
    }

    return post;
  });

  return posts;
};
