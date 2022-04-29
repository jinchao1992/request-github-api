import { createBranch, getBranches, getFileContent } from "../src/request/index"
import { getElement, parseBranches } from "./utils/util"
import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"
import "highlight.js/styles/atom-one-dark.css"

hljs.registerLanguage("json", json)

getBranchesFn()
getFileContentFn()

const $inputBranchName = getElement("inputBranchName")
const $btnBranch = getElement("btnBranch")
const $code = getElement("code")
$btnBranch.addEventListener("click", async () => {
  if ($inputBranchName.value) {
    const result = await createBranch({
      branchName: $inputBranchName.value
    })
    if (result) {
      alert("创建分支成功")
      getBranchesFn()
      $inputBranchName.value = ""
    } else {
      alert("创建分支失败")
    }
  }
})

function getBranchesFn() {
  getBranches().then(res => {
    const $branches = getElement("branches")
    $branches.innerHTML = parseBranches(res)
  })
}

function getFileContentFn() {
  getFileContent().then(res => {
    const html = hljs.highlightAuto(res, ["json"])
    $code.innerHTML = html.value
  })
}