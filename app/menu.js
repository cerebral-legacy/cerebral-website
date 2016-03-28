import React from 'react';
import MTRC from 'markdown-to-react-components';
import Contributors from './components/Contributors.js';
import install from './markdown/install.md';
import react from './markdown/react.md';
import angular from './markdown/angular.md';
import baobab from './markdown/baobab.md';
import signals from './markdown/signals.md';
import actions from './markdown/actions.md';
import input from './markdown/input.md';
import state from './markdown/state.md';
import output from './markdown/output.md';
import services from './markdown/services.md';
import factories from './markdown/factories.md';
import chains from './markdown/chains.md';
import async from './markdown/async.md';
import typeChecking from './markdown/typeChecking.md';
import events from './markdown/events.md';
import routing from './markdown/routing.md';
import transitions from './markdown/transitions.md';
import bestPractices from './markdown/best-practices.md';
import structure from './markdown/structure.md';
import getStarted from './markdown/get-started.md';
import utilities from './markdown/utilities.md';
import modules from './markdown/modules.md';
import relational from './markdown/relational.md';
import internetExplorer from './markdown/internetExplorer.md';
import propsAndState from './markdown/propsAndState.md';
import responsibilities from './markdown/responsibilities.md';
import compute from './markdown/compute.md';
import immutableJS from './markdown/immutableJS.md';
import faq from './markdown/faq.md';
import howto from './markdown/howto.md';
import serverRequests from './markdown/serverRequests.md';
import base from './markdown/base.md';
import hash from './markdown/hash.md';
import hyperlinks from './markdown/hyperlinks.md';
import nesting from './markdown/nesting.md';
import redirect from './markdown/redirect.md';
import regexp from './markdown/regexp.md';
import testing from './markdown/testing.md';
import addons from './markdown/addons.md';
import addonsCopy from './markdown/addons_copy.md';
import addonsDebounce from './markdown/addons_debounce.md';
import addonsSet from './markdown/addons_set.md';
import addonsUnset from './markdown/addons_unset.md';
import addonsToggle from './markdown/addons_toggle.md';
import addonsWhen from './markdown/addons_when.md';
import universal from './markdown/universal.md';
import snabbdom from './markdown/snabbdom.md';
import inferno from './markdown/inferno.md';
import moduleRecorder from './markdown/module_recorder.md';
import moduleRouter from './markdown/module_router.md';
import moduleHttp from './markdown/module_http.md';
import theDebugger from './markdown/debugger.md';
import sharedModules from './markdown/shared_modules.md';
import angular2 from './markdown/angular2.md';

import Home from './components/Home.js';
import GithubPage from './components/GithubPage';

export default [
  {
    label: 'Cerebral',
    icon: 'home',
    content: props => <Home {...props}/>
  },
  {
    label: 'Get Started',
    video: 'https://www.youtube.com/embed/dMvMts0nWNs',
    icon: 'power-off',
    text: getStarted.toLowerCase(),
    content: MTRC(getStarted).tree
  }, {
    label: 'Debugger',
    icon: 'bug',
    text: theDebugger.toLowerCase(),
    content: MTRC(theDebugger).tree,
    video: 'https://www.youtube.com/embed/ZMXcSRiq6fU'
  }, {
    label: 'Install',
    icon: 'download',
    text: install.toLowerCase(),
    content: MTRC(install).tree,
    subContent: [
      {
        label: 'React',
        icon: 'television',
        text: react.toLowerCase(),
        content: MTRC(react).tree
      },
      {
        label: 'Inferno',
        icon: 'television',
        text: inferno.toLowerCase(),
        content: MTRC(inferno).tree
      },
      {
        label: 'Snabbdom',
        icon: 'television',
        text: snabbdom.toLowerCase(),
        content: MTRC(snabbdom).tree
      },
      {
        label: 'Angular',
        icon: 'television',
        text: angular.toLowerCase(),
        content: MTRC(angular).tree
      },
      {
        label: 'Angular2',
        icon: 'television',
        text: angular2.toLowerCase(),
        content: MTRC(angular2).tree
      },
      {
        label: 'Baobab',
        icon: 'database',
        text: baobab.toLowerCase(),
        content: MTRC(baobab).tree
      },
      {
        label: 'Immutable JS',
        icon: 'database',
        text: immutableJS.toLowerCase(),
        content: MTRC(immutableJS).tree
      },
      {
        label: 'Internet Explorer',
        icon: 'internet-explorer',
        text: internetExplorer.toLowerCase(),
        content: MTRC(internetExplorer).tree
      }
    ]
  },
  {
    label: 'Modules',
    icon: 'th-large',
    text: modules.toLowerCase(),
    content: MTRC(modules).tree,
    video: 'https://www.youtube.com/embed/FNB0uIQtGrw',
    subContent: [{
      label: 'Shared modules',
      text: sharedModules.toLowerCase(),
      content: MTRC(sharedModules).tree
    }, {
      label: 'Router',
      text: moduleRouter.toLowerCase(),
      content: props => <GithubPage {...props} url="https://raw.githubusercontent.com/cerebral/cerebral-module-router/master/README.md"/>
    }, {
      label: 'Http',
      text: moduleHttp.toLowerCase(),
      content: props => <GithubPage {...props} url="https://raw.githubusercontent.com/cerebral/cerebral-module-http/master/README.md"/>
    }, {
      label: 'Recorder',
      text: moduleRecorder.toLowerCase(),
      content: props => <GithubPage {...props} url="https://raw.githubusercontent.com/cerebral/cerebral-module-recorder/master/README.md"/>
    }, {
      label: 'Forms',
      text: moduleRecorder.toLowerCase(),
      content: props => <GithubPage {...props} url="https://raw.githubusercontent.com/cerebral/cerebral-module-forms/master/README.md"/>
    }]
  },
  {
    label: 'Signals',
    icon: 'file-text',
    text: signals.toLowerCase(),
    content: MTRC(signals).tree,
    subContent: [
      {
        label: 'Actions',
        text: actions.toLowerCase(),
        content: MTRC(actions).tree
      },
      {
        label: 'Input',
        text: input.toLowerCase(),
        content: MTRC(input).tree
      },
      {
        label: 'State',
        text: state.toLowerCase(),
        content: MTRC(state).tree
      },
      {
        label: 'Output',
        text: output.toLowerCase(),
        content: MTRC(output).tree
      },
      {
        label: 'Async',
        text: async.toLowerCase(),
        content: MTRC(async).tree
      }
    ]
  },
  {
    label: 'Utilities',
    icon: 'wrench',
    text: utilities.toLowerCase(),
    content: MTRC(utilities).tree,
    subContent: [
      {
        label: 'Services',
        text: services.toLowerCase(),
        content: MTRC(services).tree
      },
      {
        label: 'Compute',
        text: compute.toLowerCase(),
        content: MTRC(compute).tree
      },
      {
        label: 'Factories',
        text: factories.toLowerCase(),
        content: MTRC(factories).tree
      },
      {
        label: 'Chains',
        text: chains.toLowerCase(),
        content: MTRC(chains).tree
      },
      {
        label: 'Type checking',
        text: typeChecking.toLowerCase(),
        content: MTRC(typeChecking).tree
      },
      {
        label: 'Events',
        text: events.toLowerCase(),
        content: MTRC(events).tree
      },
      {
        label: 'Universal',
        text: universal.toLowerCase(),
        content: MTRC(universal).tree
      }
    ]
  },
  {
    label: 'Addons',
    icon: 'briefcase',
    text: addons.toLowerCase(),
    content: props => <GithubPage {...props} url="https://raw.githubusercontent.com/cerebral/cerebral-addons/master/README.md"/>
  },
  {
    label: 'Routing',
    icon: 'map-signs',
    text: routing.toLowerCase(),
    content: MTRC(routing).tree,
    subContent: [
      {
        label: 'Nesting',
        text: nesting.toLowerCase(),
        content: MTRC(nesting).tree
      },
      {
        label: 'Hash',
        text: hash.toLowerCase(),
        content: MTRC(hash).tree
      },
      {
        label: 'Base',
        text: base.toLowerCase(),
        content: MTRC(base).tree
      },
      {
        label: 'Redirect',
        text: redirect.toLowerCase(),
        content: MTRC(redirect).tree
      },
      {
        label: 'Regexp',
        text: regexp.toLowerCase(),
        content: MTRC(regexp).tree
      },
      {
        label: 'Hyperlinks',
        text: hyperlinks.toLowerCase(),
        content: MTRC(hyperlinks).tree
      },
      {
        label: 'Transitions',
        text: transitions.toLowerCase(),
        content: MTRC(transitions).tree
      }
    ]
  },
  {
    label: 'How to',
    icon: 'graduation-cap',
    text: howto.toLowerCase(),
    content: MTRC(howto).tree,
    subContent: [{
      label: 'Server requests',
      text: serverRequests,
      content: MTRC(serverRequests).tree
    }]
  },
  {
    label: 'FAQ',
    icon: 'question',
    text: faq.toLowerCase(),
    content: MTRC(faq).tree
  },
  {
    label: 'Testing',
    icon: 'check-circle-o', // tnr: what icon should we use here?
    text: testing.toLowerCase(),
    content: MTRC(testing).tree
  },
  {
    label: 'Best Practices',
    icon: 'heart',
    text: bestPractices.toLowerCase(),
    content: MTRC(bestPractices).tree,
    subContent: [
      {
        label: 'Structure',
        text: structure.toLowerCase(),
        content: MTRC(structure).tree
      },
      {
        label: 'Relational data',
        text: relational.toLowerCase(),
        content: MTRC(relational).tree
      },
      {
        label: 'Props and State',
        text: propsAndState.toLowerCase(),
        content: MTRC(propsAndState).tree
      },
      {
        label: 'Responsibilities',
        text: responsibilities.toLowerCase(),
        content: MTRC(responsibilities).tree
      }
    ]
  }, {
    label: 'Contributors',
    icon: 'users',
    content: props => <Contributors {...props}/>
  }
];
