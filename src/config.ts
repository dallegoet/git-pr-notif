import * as dotenv from "dotenv";

dotenv.config();

export interface Config {
  token: string;
  owner: string;
  repo: string;
  username: string;
}

export const CONFIG: Config = {
  token: process.env.GITHUB_TOKEN as string,
  owner: process.env.GITHUB_OWNER as string,
  repo: process.env.GITHUB_REPO as string,
  username: process.env.GITHUB_USERNAME as string,
};
