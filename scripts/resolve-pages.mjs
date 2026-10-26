import { appendFileSync } from "node:fs";
const repository = process.env.GITHUB_REPOSITORY;
if (!repository) throw new Error("GITHUB_REPOSITORY is required.");
const [owner, name] = repository.split("/");
const fallback = `https://${owner.toLowerCase()}.github.io/${name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `${name}/`}`;
const raw = process.env.PUBLIC_SITE_URL || fallback;
const url = new URL(raw);
if (!["http:", "https:"].includes(url.protocol) || url.search || url.hash)
  throw new Error(
    "PUBLIC_SITE_URL must be a complete HTTP(S) URL without query or hash.",
  );
const siteUrl = url.href.replace(/\/+$/, "");
const basePath = `${url.pathname.replace(/\/$/, "")}/`;
if (!process.env.GITHUB_OUTPUT) throw new Error("GITHUB_OUTPUT is required.");
appendFileSync(
  process.env.GITHUB_OUTPUT,
  `site_url=${siteUrl}\nbase_path=${basePath}\n`,
);
