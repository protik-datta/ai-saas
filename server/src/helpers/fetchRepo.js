const axios = require("axios");
const AppError = require("../utils/AppError");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
  headers: {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  },
});

const MAX_FILES = 4;
const MAX_FILE_SIZE = 15000; // 15KB per file
const MAX_TOTAL_CHARS = 40000; // total code sent to AI

const fetchRepo = async (repoUrl) => {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new AppError(400, "Invalid GitHub URL");

  const owner = match[1];
  const repo = match[2].replace(/\.git$/, "");

  let repoData;
  try {
    const { data } = await githubApi.get(`/repos/${owner}/${repo}`);
    repoData = data;
  } catch (err) {
    if (err.response?.status === 404) {
      throw new AppError(404, "GitHub repo not found or is private");
    }
    if (err.response?.status === 403) {
      throw new AppError(
        403,
        "GitHub API rate limit exceeded — add GITHUB_TOKEN to .env",
      );
    }
    throw new AppError(500, "Failed to connect to GitHub API");
  }

  const branch = repoData.default_branch;

  let treeData;
  try {
    const { data } = await githubApi.get(
      `/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    );
    treeData = data;
  } catch {
    throw new AppError(500, "Failed to fetch repository file tree");
  }

  const reviewableExtensions = [
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".py",
    ".go",
    ".java",
    ".rs",
    ".php",
    ".rb",
    ".cs",
    ".cpp",
    ".c",
  ];

  // prioritize smaller, more meaningful files
  const files = (treeData.tree || [])
    .filter(
      (f) =>
        f.type === "blob" &&
        reviewableExtensions.some((ext) => f.path.endsWith(ext)) &&
        !f.path.includes("node_modules") &&
        !f.path.includes("dist/") &&
        !f.path.includes("build/") &&
        !f.path.includes(".min.") &&
        !f.path.includes(".test.") &&
        !f.path.includes(".spec.") &&
        !f.path.includes("__tests__") &&
        f.size > 100 &&
        f.size < MAX_FILE_SIZE,
    )
    .sort((a, b) => b.size - a.size) // bigger files first = more logic
    .slice(0, MAX_FILES);

  if (!files.length) {
    throw new AppError(
      400,
      "No reviewable source files found in this repository",
    );
  }

  const fileContents = await Promise.all(
    files.map(async (file) => {
      try {
        const { data } = await githubApi.get(
          `/repos/${owner}/${repo}/contents/${file.path}?ref=${branch}`,
        );
        const decoded = Buffer.from(data.content, "base64").toString("utf-8");
        return `// === ${file.path} ===\n${decoded}`;
      } catch {
        return null;
      }
    }),
  );

  const validContents = fileContents.filter(Boolean);

  if (!validContents.length) {
    throw new AppError(500, "Failed to fetch file contents from repository");
  }

  // truncate total code to avoid AI token overflow
  let combined = validContents.join("\n\n");
  if (combined.length > MAX_TOTAL_CHARS) {
    combined =
      combined.slice(0, MAX_TOTAL_CHARS) + "\n\n// ... (truncated for review)";
  }

  return {
    repoName: `${owner}/${repo}`,
    fileCount: validContents.length,
    code: combined,
  };
};

module.exports = fetchRepo;
