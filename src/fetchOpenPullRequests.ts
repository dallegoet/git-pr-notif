import { Octokit } from "@octokit/rest";
import { Config } from "./config";

export async function fetchOpenPullRequests(octokit: Octokit, config: Config): Promise<any[]> {
  const { data: pullRequests } = await octokit.pulls.list({
    owner: config.owner,
    repo: config.repo,
    state: "open",
  });
  console.log(`📥 Fetched ${pullRequests.length} open pull requests`);
  return pullRequests;
}
