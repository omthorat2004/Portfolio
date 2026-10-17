export function parseGithubRepo(href: string): { owner: string; repo: string } | null {
  const match = href.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}
