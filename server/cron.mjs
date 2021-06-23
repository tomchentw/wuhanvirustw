import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crawl from "./crawl.mjs";
import logger from "./logger.mjs";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  await crawl();
}

run()
  .then((it) => {
    logger.info("Done!");
  })
  .catch((error) => {
    logger.fatal(error);
  });
