import openVideo from '../actions/openVideo';
import wait from '../actions/wait';
import set from 'cerebral-addons/set';

export default [
  openVideo,
  wait,
  set('state:/transitionVideo', true)
];
