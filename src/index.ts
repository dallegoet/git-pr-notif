import { Octokit } from "@octokit/rest";
import { CONFIG } from "./config";
import { validateConfig } from "./validateConfig";
import { checkPullRequests } from "./checkPullRequests";

async function main() {
  validateConfig(CONFIG);

  const octokit = new Octokit({
    auth: CONFIG.token,
  });

  let previousPRs: any[] = [];

  console.log("🚀 Starting pull request monitoring...");

  previousPRs = await checkPullRequests(octokit, CONFIG, previousPRs);
  setInterval(async () => {
    previousPRs = await checkPullRequests(octokit, CONFIG, previousPRs);
  }, 10000); // Check every minute
}

main();
