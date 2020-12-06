import 'dotenv/config';
import { fetchContent } from '../src';
import { convertToMarkdown } from '../src/tool/convert-html-to-md';

describe('blah', () => {
  let apiUrl: string;
  let contentApiKey: string;

  beforeAll(() => {
    apiUrl = process.env.GHOST_API_URL!;
    contentApiKey = process.env.GHOST_CONTENT_API_KEY!;
  });

  it('works', async () => {
    const data = await fetchContent({ apiUrl, contentApiKey });

    expect(data).toBeDefined();
    expect(data.length).toEqual(5);
  });

  it('should convert html to markdown', () => {
    const markdown = convertToMarkdown('<h1>Hello world!</h1>');
    expect(markdown).toEqual(`Hello world!\n============`);
  });

  it('should convert <hr /> to * * *', () => {
    const markdown = convertToMarkdown('<hr />');
    expect(markdown).toEqual(`* * *`);
  });
});
