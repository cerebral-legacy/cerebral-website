import './styles/prism.scss';
import './prism';
import './styles/fonts.scss';
import './styles/style.scss';

import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {Container} from 'cerebral-view-react';
import Router from 'cerebral-module-router';
import Devtools from 'cerebral-module-devtools';
import Http from 'cerebral-module-http';
import Model from 'cerebral-model-baobab';
import Controller from 'cerebral';

import homeOpened from './signals/homeOpened';
import menuClicked from './signals/menuClicked';
import submenuClicked from './signals/submenuClicked';
import menuToggled from './signals/menuToggled';
import videoOpened from './signals/videoOpened';
import videoClosed from './signals/videoClosed';
import searchQueryChanged from './signals/searchQueryChanged';
import appClicked from './signals/appClicked';
import githubPageOpened from './signals/githubPageOpened';

const controller = Controller(Model(window.BOOTSTRAP_STATE));

controller.addSignals({
  homeOpened,
  menuClicked,
  submenuClicked,
  menuToggled,
  videoOpened,
  videoClosed,
  searchQueryChanged: {
    chain: searchQueryChanged,
    immediate: true
  },
  appClicked,
  githubPageOpened
});

controller.addModules({
  http: Http(),
  router: Router({
    '/': 'homeOpened',
    '/:content': 'menuClicked',
    '/:content/:subContent': 'submenuClicked'
  }, {
    autostart: false
  }),
  devtools: Devtools()
});

render(
  <Container controller={controller} style={{height: '100vh'}}>
    <App/>
  </Container>, document.querySelector('#app'));
