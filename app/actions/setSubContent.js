import utils from '../utils';

function setSubContent({input, state}) {
  const options = {
    content: input.content,
    subContent: input.subContent
  };

  if (utils.isSmallScreen()) {
    options.displayMenu = false;
  }

  state.merge(options);
}

export default setSubContent;
