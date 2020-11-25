import 'dotenv/config';
import { fetchContent } from '../src';

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
});
