import { createBranch, getBranches, getFileContent, updateFileContent } from "../src/request/index"
import { getElement, parseBranches } from "./utils/util"
import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"
import "highlight.js/styles/atom-one-dark.css"
import { encode } from "js-base64"

hljs.registerLanguage("json", json)

getBranchesFn()
getFileContentFn()

const $btnBranch = getElement("btnBranch")
const $code = getElement("code")
const $btnUpdateContent = getElement("btnUpdateContent")
const $branchesAll = document.querySelectorAll(".branches")
const $choseBranches = getElement("choseBranches")
let content = ""
let sha = ""

$btnBranch.addEventListener("click", async (e) => {
  if (e.target.value) {
    const result = await createBranch({
      branchName: e.target.value
    })
    if (result) {
      alert("创建分支成功")
      getBranchesFn()
      e.target.value = ""
    } else {
      alert("创建分支失败")
    }
  }
})
$btnUpdateContent.addEventListener("click", updateFileContentFn)
$choseBranches.addEventListener("change", (e) => {
  sha = e.target.value
})

function getBranchesFn() {
  getBranches().then(res => {
    $branchesAll.forEach(branches => {
      branches.innerHTML = parseBranches(res)
    })
  })
}

function getFileContentFn() {
  getFileContent({
    path: "membership_data.json",
    branch: "event_07"
  }).then(res => {
    const html = hljs.highlightAuto(res, ["json"])
    content = res
    $code.innerHTML = html.value
  })
}

function updateFileContentFn() {
  let newContent = JSON.parse(content)
  const header = {
    backgroundImage: "url222",
    color: "red",
    border: "1px solid blue"
  }
  newContent = {
    ...newContent,
    header
  }
  updateFileContent({
    path: "membership_data.json",
    branch: "main",
    sha,
    content: encode(JSON.stringify(newContent), true)
  }).then(r => {
    if (r) {
      alert("修改成功")
      getFileContentFn()
    } else {
      alert("修改失败")
    }
  })
}