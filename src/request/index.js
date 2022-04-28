import { Octokit } from "@octokit/core"

const accessToken = process.env.USER_PRIVATE_GITHUB_TOKEN || ""
const octokit = new Octokit({
  auth: accessToken
})

const defaultHeader = {
  headers: {
    accept: "application/vnd.github.v3+json"
  }
}
const defaultData = {
  ...defaultHeader,
  owner: "jinchao1992",
  repo: "request-github-api"
}

const getBranches = async () => {
  try {
    const result = await octokit.request(
      "GET /repos/{owner}/{repo}/branches",
      {
        ...defaultData,
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

const getCurrentCommit = async () => {
  const result = await octokit.request(
    "GET /repos/{owner}/{repo}/commits",
    {
      ...defaultData,
      per_page: 1
    }
  )
  return result.data[0]
}

const createRef = async (params) => {
  const { branchName, commit } = params
  return await octokit.request(
    "POST /repos/{owner}/{repo}/git/refs",
    {
      ...defaultData,
      ref: `refs/heads/${branchName}`,
      sha: commit
    }
  )
}

const createBranch = async (params) => {
  try {
    const commit = await getCurrentCommit()
    return await createRef({
      ...params,
      commit: commit.sha
    })
  } catch (e) {
    console.log(e)
    return null
  }
}

export {
  getBranches,
  createBranch
}