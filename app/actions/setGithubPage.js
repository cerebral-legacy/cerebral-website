function setGithubPage({input, state}) {
  state.set(['githubPages', input.url], input.result);
}

export default setGithubPage;
