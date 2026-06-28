const REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO_URL ??
  "https://github.com/fraserbrownirl/pumperp-docs";
const BRANCH = process.env.NEXT_PUBLIC_GITHUB_BRANCH ?? "main";

export const githubSourceUrl = (relativePath: string): string =>
  `${REPO}/blob/${BRANCH}/${relativePath}`;
