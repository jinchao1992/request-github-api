import { createBranch, getBranches } from "../src/request/index"
import { getElement, parseBranches } from "./utils/util"

getBranchesFn()

const $inputBranchName = getElement("inputBranchName")
const $btnBranch = getElement("btnBranch")
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