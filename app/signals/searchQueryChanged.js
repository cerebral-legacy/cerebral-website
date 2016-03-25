import copy from 'cerebral-addons/copy';
import set from 'cerebral-addons/set';
import isMinLength3 from '../actions/isMinLength3';
import search from '../actions/search';

export default [
  copy('input:/query', 'state:/searchQuery'),
  isMinLength3, {
    true: [
      search,
      set('state:/showSearchResult', true)
    ],
    false: [
      set('state:/searchResults', []),
      set('state:/showSearchResult', false)
    ]
  }
];
