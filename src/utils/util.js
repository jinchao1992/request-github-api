function getElement(className) {
  return document.querySelector(`.${className}`)
}

function parseBranches(branches) {
  return branches.map(branch => {
    const { name, commit } = branch
    return `<option value="${commit.sha}">${name}</option>`
  }).join(" ")
}

export {
  getElement,
  parseBranches
}