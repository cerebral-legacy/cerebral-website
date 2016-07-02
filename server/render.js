import React from 'react';
import {renderToString} from 'react-dom/server';
import {ServerController} from 'cerebral';
import {Container} from 'cerebral-view-react';
import App from '../app/components/App';
import fs from 'fs';

const isDeveloping = process.env.NODE_ENV !== 'production';

export default (app) => {
  const index = fs.readFileSync('./server/index.html', 'utf-8').toString();
  const getIndex = () => {
    return isDeveloping ? index : fs.readFileSync('./server/index.html', 'utf-8').toString();
  };
  const render = (newState) => {
    const state = Object.assign({
      currentPage: 'front',
      currentDocument: 'get_started',
      menu: {
        'Introduction': [
          'Introduction',
          'Structuring state',
          'Defining signals',
          'Creating components'
        ],
        'Next step': [
          'Next step',
          'Adding modules',
          'Creating actions',
          'Adding a shared module'
        ],
        'Advanced': [
          'Advanced',
          'Routing',
          'Creating a service',
          'Context providers',
          'Data and ux',
          'Computed'
        ],
        'Get started': [
          'Get started',
          'Choosing a project type',
          'Choosing a model',
          'Choosing a view',
          'Structuring your project',
          'The debugger',
          'Going to production'
        ],
        'Api': [
          'Controller',
          'Modules',
          'Signals',
          'Actions',
          'Operators',
          'Services',
          'Chains',
          'Factories',
          'Computed',
          'Context providers'
        ],
        'Modules': [
          'cerebral-module-http',
          'cerebral-module-forms',
          'cerebral-module-useragent',
          'cerebral-module-router',
          'cerebral-module-recorder',
          'cerebral-module-fuse',
          'cerebral-module-firebase',
          'cerebral-module-falcor'
        ],
        'Context providers': [
          'cerebral-provider-modules'
        ]
      }
    }, newState);
    const controller = ServerController(state);

    return {
      state: JSON.stringify(state, null, 2),
      html: renderToString(<Container controller={controller} style={{height: '100vh'}}><App/></Container>)
    };
  };

  app.get('/', (req, res) => {
    res.type('html');
    const view = render();
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });

  app.get('/documentation', (req, res) => {
    res.type('html');
    const view = render({
      currentPage: 'documentation'
    });
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });

  app.get('/documentation/:doc', (req, res) => {
    res.type('html');
    const view = render({
      currentPage: 'documentation',
      currentDocument: req.params.doc
    });
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });
};
