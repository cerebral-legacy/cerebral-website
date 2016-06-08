import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import Router from 'cerebral-module-router';

import rootRouted from './signals/rootRouted';
import documentationClicked from './signals/documentationClicked';
import documentClicked from './signals/documentClicked';

const controller = Controller(Model(window.BOOTSTRAP_STATE));

controller.addSignals({
  rootRouted,
  documentationClicked,
  documentClicked
});

controller.addModules({

  router: Router({
    '/': 'rootRouted',
    '/documentation': 'documentationClicked',
    '/documentation/:doc': 'documentClicked'
  })
});

export default controller;
