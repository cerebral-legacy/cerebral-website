import MTRC from 'markdown-to-react-components';
import Home from './Home.js';
import Contributors from './Contributors.js';
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
import theDebugger from './markdown/debugger.md';

export default [
  {
    label: 'Cerebral',
    icon: 'home',
    content: Home
  },
  {
    label: 'Get Started',
    video: 'https://www.youtube.com/embed/dMvMts0nWNs',
    icon: 'power-off',
    text: getStarted,
    content: MTRC(getStarted).tree
  }, {
    label: 'Debugger',
    icon: 'bug',
    text: theDebugger,
    content: MTRC(theDebugger).tree,
    video: 'https://www.youtube.com/embed/cq1rmXGk59o'
  }, {
    label: 'Install',
    icon: 'download',
    text: install,
    content: MTRC(install).tree,
    subContent: [
      {
        label: 'React',
        icon: 'television',
        text: react,
        content: MTRC(react).tree
      },
      {
        label: 'Inferno',
        icon: 'television',
        text: inferno,
        content: MTRC(inferno).tree
      },
      {
        label: 'Snabbdom',
        icon: 'television',
        text: snabbdom,
        content: MTRC(snabbdom).tree
      },
      {
        label: 'Angular',
        icon: 'television',
        text: angular,
        content: MTRC(angular).tree
      },
      {
        label: 'Baobab',
        icon: 'database',
        text: baobab,
        content: MTRC(baobab).tree
      },
      {
        label: 'Immutable JS',
        icon: 'database',
        text: immutableJS,
        content: MTRC(immutableJS).tree
      },
      {
        label: 'Internet Explorer',
        icon: 'internet-explorer',
        text: internetExplorer,
        content: MTRC(internetExplorer).tree
      }
    ]
  },
  {
    label: 'Modules',
    icon: 'th-large',
    text: modules,
    content: MTRC(modules).tree,
    video: 'https://www.youtube.com/embed/FNB0uIQtGrw',
    subContent: [{
      label: 'Recorder',
      text: moduleRecorder,
      content: MTRC(moduleRecorder).tree
    }, {
      label: 'Router',
      text: moduleRouter,
      content: MTRC(moduleRouter).tree
    }]
  },
  {
    label: 'Signals',
    icon: 'file-text',
    text: signals,
    content: MTRC(signals).tree,
    subContent: [
      {
        label: 'Actions',
        text: actions,
        content: MTRC(actions).tree
      },
      {
        label: 'Input',
        text: input,
        content: MTRC(input).tree
      },
      {
        label: 'State',
        text: state,
        content: MTRC(state).tree
      },
      {
        label: 'Output',
        text: output,
        content: MTRC(output).tree
      },
      {
        label: 'Async',
        text: async,
        content: MTRC(async).tree
      }
    ]
  },
  {
    label: 'Utilities',
    icon: 'wrench',
    text: utilities,
    content: MTRC(utilities).tree,
    subContent: [
      {
        label: 'Services',
        text: services,
        content: MTRC(services).tree
      },
      {
        label: 'Compute',
        text: compute,
        content: MTRC(compute).tree
      },
      {
        label: 'Factories',
        text: factories,
        content: MTRC(factories).tree
      },
      {
        label: 'Chains',
        text: chains,
        content: MTRC(chains).tree
      },
      {
        label: 'Type checking',
        text: typeChecking,
        content: MTRC(typeChecking).tree
      },
      {
        label: 'Events',
        text: events,
        content: MTRC(events).tree
      },
      {
        label: 'Universal',
        text: universal,
        content: MTRC(universal).tree
      }
    ]
  },
  {
    label: 'Addons',
    icon: 'briefcase',
    text: addons,
    content: MTRC(addons).tree,
    subContent: [{
      label: 'Copy',
      text: addonsCopy,
      content: MTRC(addonsCopy).tree
    }, {
      label: 'Debounce',
      text: addonsDebounce,
      content: MTRC(addonsDebounce).tree
    }, {
      label: 'Set',
      text: addonsSet,
      content: MTRC(addonsSet).tree
    }, {
      label: 'Unset',
      text: addonsUnset,
      content: MTRC(addonsUnset).tree
    }, {
      label: 'Toggle',
      text: addonsToggle,
      content: MTRC(addonsToggle).tree
    }, {
      label: 'When',
      text: addonsWhen,
      content: MTRC(addonsWhen).tree
    }]
  },
  {
    label: 'Routing',
    icon: 'map-signs',
    text: routing,
    content: MTRC(routing).tree,
    subContent: [
      {
        label: 'Nesting',
        text: nesting,
        content: MTRC(nesting).tree
      },
      {
        label: 'Hash',
        text: hash,
        content: MTRC(hash).tree
      },
      {
        label: 'Base',
        text: base,
        content: MTRC(base).tree
      },
      {
        label: 'Redirect',
        text: redirect,
        content: MTRC(redirect).tree
      },
      {
        label: 'Regexp',
        text: regexp,
        content: MTRC(regexp).tree
      },
      {
        label: 'Hyperlinks',
        text: hyperlinks,
        content: MTRC(hyperlinks).tree
      },
      {
        label: 'Transitions',
        text: transitions,
        content: MTRC(transitions).tree
      }
    ]
  },
  {
    label: 'How to',
    icon: 'graduation-cap',
    text: howto,
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
    text: faq,
    content: MTRC(faq).tree
  },
  {
    label: 'Testing',
    icon: 'check-circle-o', // tnr: what icon should we use here?
    text: testing,
    content: MTRC(testing).tree
  },
  {
    label: 'Best Practices',
    icon: 'heart',
    text: bestPractices,
    content: MTRC(bestPractices).tree,
    subContent: [
      {
        label: 'Structure',
        text: structure,
        content: MTRC(structure).tree
      },
      {
        label: 'Relational data',
        text: relational,
        content: MTRC(relational).tree
      },
      {
        label: 'Props and State',
        text: propsAndState,
        content: MTRC(propsAndState).tree
      },
      {
        label: 'Responsibilities',
        text: responsibilities,
        content: MTRC(responsibilities).tree
      }
    ]
  }, {
    label: 'Contributors',
    icon: 'users',
    content: Contributors
  }
];
