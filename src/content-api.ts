import GhostContentAPI from '@tryghost/content-api';

export interface ContentAPIOptions {
  apiUrl: string;
  contentApiKey: string;
  version?: 'v2' | 'v3' | 'canary';
}

export const configure = (config: ContentAPIOptions) => {
  return new GhostContentAPI({
    url: config.apiUrl,
    key: config.contentApiKey,
    version: config.version || 'v3',
  });
};
