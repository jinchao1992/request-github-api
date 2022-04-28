import { getBranches } from "../src/request/index"
import { getElement, parseBranches } from "./utils/util"

getBranches().then(res => {
  const $branches = getElement("branches")
  $branches.innerHTML = parseBranches(res)
})