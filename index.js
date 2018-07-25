// The second part of XHR is handling the response once we've made the request. We do this by defining an event listener on the request to listen for the load event, which will tell us that the request is complete. We'll give this listener a callback function, which is simply a function that will get called when the event fires.

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
//have to tell the JS to parse this as JSON data so we don't get a bunch of undefined values
//update the pages content with the repoList
//sends a concatenated string to be set as the innerHTML for the repositories element, which will then be rendered on the page like any other HTML

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories); //calls the callback fn (showRepositories) when the "load" event occurs
  req.open("GET", 'https://api.github.com/users/josh-kramer-dev/repos');
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
