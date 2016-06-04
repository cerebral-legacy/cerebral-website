import React from 'react';
import {render} from 'react-dom';
import {Container} from 'cerebral-view-react';
import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';

import App from './components/App';

const controller = Controller(Model({}));

render((
  <Container controller={controller} style={{height: '100vh'}}>
    <App />
  </Container>
), document.querySelector('#app'));
