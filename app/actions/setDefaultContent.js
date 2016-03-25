import utils from '../utils';

function setDefaultContent({state}) {
  const options = {
    content: 'cerebral',
    subContent: null
  };

  if (utils.isSmallScreen()) {
    options.displayMenu = false;
  }

  state.merge(options);
}

export default setDefaultContent;
