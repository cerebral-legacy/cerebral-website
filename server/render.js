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
  const render = (content, subContent) => {
    const state = {
      content: content,
      subContent: subContent || null,
      displayMenu: true,
      showOverlay: false,
      videoSrc: null,
      transitionVideo: false,
      searchQuery: '',
      searchResults: [],
      showSearchResult: false,
      githubPages: {}
    };
    const controller = ServerController(state);

    return {
      state: JSON.stringify(state, null, 2),
      html: renderToString(<Container controller={controller} style={{height: '100vh'}}><App/></Container>)
    };
  };

  app.get('/', (req, res) => {
    res.type('html');
    const view = render('cerebral');
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });

  app.get('/:content', (req, res) => {
    res.type('html');
    const view = render(req.params.content);
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });

  app.get('/:content/:subContent', (req, res) => {
    res.type('html');
    const view = render(req.params.content, req.params.subContent);
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });
};
