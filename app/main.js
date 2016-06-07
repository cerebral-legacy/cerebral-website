import './prism.scss';
import './prism';
import React from 'react';
import {render} from 'react-dom';
import {Container} from 'cerebral-view-react';
import controller from './controller';

import App from './components/App';

render((
  <Container controller={controller} style={{height: '100vh'}}>
    <App />
  </Container>
), document.querySelector('#app'));
