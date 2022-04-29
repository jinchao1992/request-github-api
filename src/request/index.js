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
      ...defaultHeader,
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
      ...defaultHeader,
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

const getFileContent = async (params) => {
  const { branch, path } = params
  try {
    const result = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        ...defaultData,
        branch,
        path,
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

const updateFileContent = async (params) => {
  const {
    branch,
    path,
    commitMessage = ":art: Update event success",
    content,
    sha
  } = params
  try {
    await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        ...defaultData,
        branch,
        path,
        message: commitMessage,
        content,
        sha,
        mediaType: {
          format: "raw"
        }
      }
    )
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export {
  getBranches,
  createBranch,
  getFileContent,
  updateFileContent
}