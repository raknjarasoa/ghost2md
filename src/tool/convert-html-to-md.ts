import TurndownService from 'turndown';

export const convertToMarkdown = (html: string) => {
  const turndownService = new TurndownService();
  return turndownService.turndown(html);
};
