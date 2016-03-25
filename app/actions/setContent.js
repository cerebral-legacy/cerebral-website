import utils from '../utils';

function setContent({input, state}) {
  const options = {
    content: input.content,
    subContent: null
  };

  if (utils.isSmallScreen()) {
    options.displayMenu = false;
  }

  state.merge(options);
}

export default setContent;
