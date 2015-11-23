import './styles/base.css';
import './styles/base-layout.css';
import './styles/base-components.css';
import './styles/highlight.css';
import './styles/fonts.css';
import './styles/styles.css';

import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';
import controller from './controller';

controller.signal('homeOpened', [
  function setContent(input, state, output, services) {
    services.router.redirect('/cerebral');
  }
]);

controller.signal('menuClicked', [
  function setContent(input, state) {
    state.merge({
      content: input.content,
      subContent: null
    });
  }
]);

controller.signal('submenuClicked', [
  function setContent(input, state) {
    state.merge({
      content: input.content,
      subContent: input.subContent
    });
  }
]);

controller.signal('menuToggled', [
  function toggleMenu(input, state) {
    state.set(['displayMenu'], !state.get('displayMenu'));
  }
]);

controller.signal('videoOpened', [
  function openVideo(input, state) {
    state.merge({
      videoSrc: input.videoSrc,
      showOverlay: true
    });
  },
  [
    function timeout(input, state, output) {
      setTimeout(output, 50);
    }
  ],
  function transition(input, state) {
    state.set(['transitionVideo'], true);
  }
]);

controller.signal('videoClosed', [
  function closeVideo(input, state) {
    state.merge({
      videoSrc: null,
      showOverlay: false,
      transitionVideo: false
    });
  }
]);

Router(controller, {
  '/': 'homeOpened',
  '/:content': 'menuClicked',
  '/:content/:subContent': 'submenuClicked'
}, {
  onlyHash: true
}).trigger();

render(
  <Container controller={controller}>
    <App/>
  </Container>, document.querySelector('#app'));
