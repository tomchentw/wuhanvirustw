import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import createFetch from "@vercel/fetch";

const fetch = createFetch();

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(DIRNAME, `../public/data/raw`);

const INTERVAL = 5 * 60 * 1000; // 5 minute
const URL_LIST = [
  {
    pathname: `1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.json`,
    url: `https://spreadsheets.google.com/feeds/list/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4/1/public/basic?alt=json`,
  },
];

export default async function crawl() {
  await fs.promises.mkdir(RAW_DIR, { recursive: true });
  await Promise.all(
    URL_LIST.map(async ({ pathname, url }) => {
      while (true) {
        const dataPath = path.join(RAW_DIR, pathname);
        const [text, prevText] = await Promise.all([
          fetch(url).then((r) => r.text()),
          fs.promises.readFile(dataPath, "utf-8").catch((error) => {
            if ("ENOENT" !== error.code) {
              throw error;
            }
          }),
        ]);
        if (text !== prevText) {
          await fs.promises.writeFile(dataPath, text);
          return;
        } else {
          await new Promise((resolve) => setTimeout(resolve, INTERVAL));
        }
      }
    })
  );
}
