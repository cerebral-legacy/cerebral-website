import './styles/highlight.css';
import './styles/fonts.css';

import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';
import controller from './controller';

controller.signal('homeOpened', [
  function setContent({state}) {
    state.merge({
      content: 'cerebral',
      subContent: null
    });
  }
]);

controller.signal('menuClicked', [
  function setContent({input, state}) {
    state.merge({
      content: input.content,
      subContent: null
    });
  }
]);

controller.signal('submenuClicked', [
  function setContent({input, state}) {
    state.merge({
      content: input.content,
      subContent: input.subContent
    });
  }
]);

controller.signal('menuToggled', [
  function toggleMenu({state}) {
    state.set(['displayMenu'], !state.get('displayMenu'));
  }
]);

controller.signal('videoOpened', [
  function openVideo({input, state}) {
    state.merge({
      videoSrc: input.videoSrc,
      showOverlay: true
    });
  },
  [
    function timeout({output}) {
      setTimeout(output, 50);
    }
  ],
  function transition({state}) {
    state.set(['transitionVideo'], true);
  }
]);

controller.signal('videoClosed', [
  function closeVideo({state}) {
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
}).trigger();

render(
  <Container controller={controller} style={{height: '100vh'}}>
    <App/>
  </Container>, document.querySelector('#app'));
