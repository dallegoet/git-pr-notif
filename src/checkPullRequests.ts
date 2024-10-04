import { Octokit } from "@octokit/rest";
import { Config } from "./config";
import { fetchOpenPullRequests } from "./fetchOpenPullRequests";
import { findNewPullRequests } from "./findNewPullRequests";
import { checkPullRequestReviewers } from "./checkPullRequestReviewers";
import { checkPullRequestMentions } from "./checkPullRequestMentions";

export async function checkPullRequests(octokit: Octokit, config: Config, previousPRs: any[]): Promise<any[]> {
  try {
    const pullRequests = await fetchOpenPullRequests(octokit, config);
    const newPRs = findNewPullRequests(pullRequests, previousPRs);

    for (const pr of newPRs) {
      await checkPullRequestReviewers(octokit, pr, config);
      await checkPullRequestMentions(octokit, pr, config);
    }

    return pullRequests;
  } catch (error) {
    console.error("❌ Error fetching pull requests, review requests, comments, or replies:", error);
    return previousPRs;
  }
}
