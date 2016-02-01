import './styles/highlight.css';
import './styles/fonts.css';
import './styles/style.scss';

import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';
import controller from './controller';

function isSmallScreen() {
  return window.innerWidth <= 700;
}

controller.signal('homeOpened', [
  function setContent({state}) {
    const options = {
      content: 'cerebral',
      subContent: null
    };

    if (isSmallScreen()) {
      options.displayMenu = false;
    }

    state.merge(options);
  }
]);

controller.signal('menuClicked', [
  function setContent({input, state}) {
    const options = {
      content: input.content,
      subContent: null
    };

    if (isSmallScreen()) {
      options.displayMenu = false;
    }

    state.merge(options);
  }
]);

controller.signal('submenuClicked', [
  function setContent({input, state}) {
    const options = {
      content: input.content,
      subContent: input.subContent
    };

    if (isSmallScreen()) {
      options.displayMenu = false;
    }

    state.merge(options);
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
