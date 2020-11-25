import * as cheerio from 'cheerio';

/**
 * Extract specific tags from html and return them in a new object.
 *
 * Only style tags are extracted at present.
 */
export const parseCodeinjection = (html: string) => {
  let $: cheerio.Root = null as any;

  /**
   * Attempt to load the HTML into cheerio. Do not escape the HTML.
   */
  try {
    $ = cheerio.load(html, { decodeEntities: false });
  } catch (e) {
    return {};
  }

  /**
   * Extract all style tags from the markup.
   */
  const $parsedStyles = $(`style`);
  const codeInjObj: any = {};

  /**
   * For each extracted tag, add or append the tag's HTML to the new object.
   */
  $parsedStyles.each((i, style) => {
    if (i === 0) {
      codeInjObj.styles = $(style).html();
    } else {
      codeInjObj.styles += $(style).html();
    }
  });

  return codeInjObj;
};
