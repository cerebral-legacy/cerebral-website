import Model from 'cerebral-model-baobab';
import Controller from 'cerebral';

const model = Model({
  content: 0,
  subContent: null,
  displayMenu: window.innerWidth > 780,
  showOverlay: false,
  videoSrc: null,
  transitionVideo: false
});

export default Controller(model);
