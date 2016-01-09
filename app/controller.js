import Model from 'cerebral-model-baobab';
import Controller from 'cerebral';

const model = Model({
  content: 0,
  subContent: null,
  displayMenu: true,
  showOverlay: false,
  videoSrc: null,
  transitionVideo: false
});

export default Controller(model);
