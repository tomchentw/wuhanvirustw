import spawn from "cross-spawn";
import logger from "./logger.mjs";

async function run() {
  // Prepare data folder to work with
  if (!process.env.CI) {
    spawn.sync("rm", ["-rf", "public/data"], { stdio: "inherit" });
    spawn.sync("git", ["fetch", "--all"], { stdio: "inherit" });
  }
  spawn.sync("git", ["restore", "--source=origin/gh-pages", "data"], {
    stdio: "inherit",
  });
  spawn.sync("mv", ["data", "public/data"], { stdio: "inherit" });
}

run()
  .then(() => {})
  .catch((error) => {
    logger.fatal(error);
  });
