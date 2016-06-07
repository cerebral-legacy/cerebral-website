import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import Router from 'cerebral-module-router';

import rootRouted from './signals/rootRouted';
import documentationClicked from './signals/documentationClicked';

const controller = Controller(Model(window.BOOTSTRAP_STATE));

controller.addSignals({
  rootRouted,
  documentationClicked
});

controller.addModules({

  router: Router({
    '/': 'rootRouted',
    '/documentation': 'documentationClicked'
  })
});

export default controller;
