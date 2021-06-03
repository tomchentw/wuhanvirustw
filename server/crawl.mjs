import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseFeed } from "htmlparser2";
import createFetch from "@vercel/fetch";

const fetch = createFetch();

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(DIRNAME, `../public/data/raw`);

const INTERVAL = 5 * 60 * 1000; // 5 minute
const URL_LIST = [
  {
    pathname: `1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4.json`,
    url: `https://spreadsheets.google.com/feeds/cells/1q5Y5hWgQJPfIk9VhSYnSZ3ENZz9UIF03NzSusgpg6F4/o59fx4/public/basic`,
    transform: atomFeedToCustomJson,
  },
];

export default async function crawl() {
  await fs.promises.mkdir(RAW_DIR, { recursive: true });
  await Promise.all(
    URL_LIST.map(async ({ pathname, url, transform }) => {
      while (true) {
        const dataPath = path.join(RAW_DIR, pathname);
        const [text, prevText] = await Promise.all([
          fetch(url)
            .then((r) => r.text())
            .then(transform),
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

function atomFeedToCustomJson(string) {
  const dom = parseFeed(string);
  const { list } = dom.items.reduce(
    (acc, { title, description }) => {
      const [_, rowNumber] = title.match(/^\S(\d+)$/);
      const index = parseInt(rowNumber, 10) - 1;
      if (index === acc.currentIndex + 1) {
        acc.list.push(`  [${acc.current.join(", ")}]`);
        acc.current = [];
        acc.currentIndex = acc.list.length;
      }
      acc.current.push(JSON.stringify(description || ""));
      return acc;
    },
    {
      currentIndex: 0,
      current: [],
      list: [],
    }
  );
  return `[\n${list.join(",\n")}\n]`;
}
