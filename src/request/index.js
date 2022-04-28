import { Octokit } from "@octokit/core"

const accessToken = process.env.USER_PRIVATE_GITHUB_TOKEN || ""
const octokit = new Octokit({
  auth: accessToken
})

const getBranches = async () => {
  try {
    const result = await octokit.request(
      "GET /repos/{owner}/{repo}/branches",
      {
        headers: {
          accept: "application/vnd.github.v3+json"
        },
        owner: "jinchao1992",
        repo: "request-github-api",
        mediaType: {
          format: "raw"
        }
      }
    )
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export {
  getBranches
}