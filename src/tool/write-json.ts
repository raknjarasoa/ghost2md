import { mkdirSync, promises as fs } from 'fs';

const GHOST_TMP = '.ghost/tmp';

export const writeJson = async (
  subFolderName: string,
  data: { slug: string }
) => {
  try {
    mkdirSync(`${GHOST_TMP}/${subFolderName}`, { recursive: true });
  } catch (error) {}

  try {
    await fs.writeFile(
      `${GHOST_TMP}/${subFolderName}/${data.slug}.json`,
      JSON.stringify(data)
    );
  } catch (error) {
    console.log(error);
  }
};

export const writeToMarkdown = async (
  subFolderName: string,
  slug: string,
  rawText: string
) => {
  try {
    mkdirSync(`${GHOST_TMP}/${subFolderName}`, { recursive: true });
  } catch (error) {}

  try {
    const outputFileName = `${slug}.md`;
    await fs.writeFile(
      `${GHOST_TMP}/${subFolderName}/${outputFileName}`,
      rawText
    );
  } catch (error) {
    console.log(error);
  }
};
