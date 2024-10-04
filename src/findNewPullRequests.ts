export function findNewPullRequests(pullRequests: any[], previousPRs: any[]): any[] {
  const newPRs = pullRequests.filter((pr) => !previousPRs.some((prevPR) => prevPR.id === pr.id));
  console.log(`🆕 Found ${newPRs.length} new pull requests`);
  return newPRs;
}
