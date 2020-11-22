function findLink() {
  let as = document.getElementsByTagName('a')
  for(let i = 0; i < as.length; i++) {
    if (as[i].href.match('stackoverflow.com')) {
      return as[i].href
    }
  }
}

function HTTPRequest(method, url, body, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.onload = callback
  xhr.send(JSON.stringify(body))
}

function appendText() {
  let json = JSON.parse(this.response)
  if (json && json.html) {
    let mainBlock = document.createElement('div')
    mainBlock.setAttribute('class', 'instant-stack-overflow')
    let searchResult = document.createElement('div')
    searchResult.setAttribute('class', 'search-result')
    searchResult.innerHTML = json.html
    mainBlock.appendChild(searchResult)
    let parent = document.getElementById('search')
    parent.insertBefore(mainBlock, parent.firstChild)
  }
}

let link = findLink()
if (link) {
  HTTPRequest(
    'POST',
    'https://stack-overflow-extension.herokuapp.com/api/v1/requests',
    { 'link': link },
    appendText
  )
}
