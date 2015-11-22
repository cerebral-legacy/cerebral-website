import Model from 'cerebral-baobab';
import Controller from 'cerebral';

const model = Model({
  itemIndex: 0,
  subitemIndex: null,
  currentSubPage: null,
  displayMenu: true,
  showOverlay: false,
  videoSrc: null,
  transitionVideo: false
});

export default Controller(model);
