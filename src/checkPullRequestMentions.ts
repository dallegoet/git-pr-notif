import { Octokit } from "@octokit/rest";
import { Config } from "./config";
import notifier from "node-notifier";

export async function checkPullRequestMentions(octokit: Octokit, pr: any, config: Config): Promise<void> {
  const { data: comments } = await octokit.issues.listComments({
    owner: config.owner,
    repo: config.repo,
    issue_number: pr.number,
  });

  const mentionComments = comments.filter((comment) => comment.body?.includes(`@${config.username}`));
  for (const comment of mentionComments) {
    notifier.notify({
      title: `${pr.title}`,
      message: comment.body,
      open: `https://github.com/${config.owner}/${config.repo}/pull/${pr.number}#issuecomment-${comment.id}`,
    });
    console.log(`📣 You have been mentioned in a comment on PR #${pr.number}: ${pr.title}`);
  }
}
