import { Octokit } from "@octokit/core"

const assessToken = "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"
const octokit = new Octokit({
  auth: assessToken
})
const result = await octokit.request(
  "GET /repos/{owner}/{repo}",
  {
    owner: "jinchao1992",
    repo: "request-github-api",
    mediaType: {
      format: "raw"
    }
  }
)

console.log(result.data)