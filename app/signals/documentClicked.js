import copy from 'cerebral-addons/copy';
import set from 'cerebral-addons/set';

export default [
  copy('input:/doc', 'state:/currentDocument'),
  set('state:/currentPage', 'documentation'),
  set('state:/menuIsOpen', false)
];
