import { Octokit } from "@octokit/rest";
import { Config } from "./config";
import notifier from "node-notifier";

export async function checkPullRequestReviewers(octokit: Octokit, pr: any, config: Config): Promise<void> {
  const { data: reviewRequests } = await octokit.pulls.listRequestedReviewers({
    owner: config.owner,
    repo: config.repo,
    pull_number: pr.number,
  });

  const isRequestedReviewer = reviewRequests.users.some((user: any) => user.login === config.username);
  if (isRequestedReviewer) {
    notifier.notify({
      title: "🐙 New Review Request",
      message: `PR #${pr.number}: ${pr.title}`,
      open: `https://github.com/${config.owner}/${config.repo}/pull/${pr.number}`,
    });
    console.log(`🔍 You have been requested to review PR #${pr.number}: ${pr.title}`);
  }
}
