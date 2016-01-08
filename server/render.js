import React from 'react';
import {renderToString} from 'react-dom/server';
import {ServerController} from 'cerebral';
import {Container} from 'cerebral-react';
import App from '../app/App';
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
      transitionVideo: false
    };
    const controller = ServerController(state);

    return renderToString(<Container controller={controller} style={{height: '100vh'}}><App/></Container>);
  };

  app.get('/', (req, res) => {
    res.type('html');
    res.send(getIndex().replace('${body}', render('cerebral')));
  });

  app.get('/:content', (req, res) => {
    res.type('html');
    res.send(getIndex().replace('${body}', render(req.params.content)));
  });

  app.get('/:content/:subContent', (req, res) => {
    res.type('html');
    res.send(getIndex().replace('${body}', render(req.params.content, req.params.subContent)));
  });
};
