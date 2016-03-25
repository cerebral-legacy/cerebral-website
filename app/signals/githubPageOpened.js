import httpGet from 'cerebral-module-http/get';
import setGithubPage from '../actions/setGithubPage';

export default [
  httpGet(['input:/url']), {
    success: [
      setGithubPage
    ],
    error: [

    ]
  }
];
