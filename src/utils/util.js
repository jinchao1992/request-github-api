function getElement(className) {
  return document.querySelector(`.${className}`)
}

function parseBranches(branches) {
  return branches.map(branch => {
    const { name } = branch
    return `<li><a href="https://github.com/jinchao1992/request-github-api/${name}" target="_blank">${name}</a></li>`
  }).join(" ")
}

export {
  getElement,
  parseBranches
}