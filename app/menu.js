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
import addonsSet from './markdown/addons_set.md';
import addonsUnset from './markdown/addons_unset.md';
import addonsToggle from './markdown/addons_toggle.md';
import addonsWhen from './markdown/addons_when.md';
import addonsInputToState from './markdown/addons_inputToState.md';
import addonsStateToOutput from './markdown/addons_stateToOutput.md';
import universal from './markdown/universal.md';
import snabbdom from './markdown/snabbdom.md';
import moduleRecorder from './markdown/module_recorder.md';

export default [
  {
    label: 'Cerebral',
    icon: 'home',
    content: Home
  }, {
    label: 'Install',
    icon: 'download',
    content: MTRC(install).tree,
    subContent: [
      {
        label: 'React',
        icon: 'television',
        content: MTRC(react).tree
      },
      {
        label: 'Snabbdom',
        icon: 'television',
        content: MTRC(snabbdom).tree
      },
      {
        label: 'Angular',
        icon: 'television',
        content: MTRC(angular).tree
      },
      {
        label: 'Baobab',
        icon: 'database',
        content: MTRC(baobab).tree
      },
      {
        label: 'Immutable JS',
        icon: 'database',
        content: MTRC(immutableJS).tree
      },
      {
        label: 'Internet Explorer',
        icon: 'internet-explorer',
        content: MTRC(internetExplorer).tree
      }
    ]
  },
  {
    label: 'Get Started',
    icon: 'power-off',
    content: MTRC(getStarted).tree
  },
  {
    label: 'How to',
    icon: 'graduation-cap',
    content: MTRC(howto).tree,
    subContent: [{
      label: 'Server requests',
      content: MTRC(serverRequests).tree
    }]
  },
  {
    label: 'FAQ',
    icon: 'question',
    content: MTRC(faq).tree
  },
  {
    label: 'Signals',
    icon: 'file-text',
    content: MTRC(signals).tree,
    subContent: [
      {
        label: 'Actions',
        content: MTRC(actions).tree
      },
      {
        label: 'Input',
        content: MTRC(input).tree
      },
      {
        label: 'State',
        content: MTRC(state).tree
      },
      {
        label: 'Output',
        content: MTRC(output).tree
      },
      {
        label: 'Async',
        content: MTRC(async).tree
      }
    ]
  },
  {
    label: 'Utilities',
    icon: 'wrench',
    content: MTRC(utilities).tree,
    subContent: [
      {
        label: 'Services',
        content: MTRC(services).tree
      },
      {
        label: 'Compute',
        content: MTRC(compute).tree
      },
      {
        label: 'Factories',
        content: MTRC(factories).tree
      },
      {
        label: 'Chains',
        content: MTRC(chains).tree
      },
      {
        label: 'Type checking',
        content: MTRC(typeChecking).tree
      },
      {
        label: 'Events',
        content: MTRC(events).tree
      },
      {
        label: 'Universal',
        content: MTRC(universal).tree
      }
    ]
  },
  {
    label: 'Modules',
    icon: 'th-large',
    content: MTRC(modules).tree,
    subContent: [{
      label: 'Recorder',
      content: MTRC(moduleRecorder).tree
    }]
  },
  {
    label: 'Addons',
    icon: 'briefcase',
    content: MTRC(addons).tree,
    subContent: [{
      label: 'Set',
      content: MTRC(addonsSet).tree
    }, {
      label: 'Unset',
      content: MTRC(addonsUnset).tree
    }, {
      label: 'Toggle',
      content: MTRC(addonsToggle).tree
    }, {
      label: 'When',
      content: MTRC(addonsWhen).tree
    }, {
      label: 'Input to state',
      content: MTRC(addonsInputToState).tree
    }, {
      label: 'State to output',
      content: MTRC(addonsStateToOutput).tree
    }]
  },
  {
    label: 'Routing',
    icon: 'map-signs',
    content: MTRC(routing).tree,
    subContent: [
      {
        label: 'Nesting',
        content: MTRC(nesting).tree
      },
      {
        label: 'Hash',
        content: MTRC(hash).tree
      },
      {
        label: 'Base',
        content: MTRC(base).tree
      },
      {
        label: 'Redirect',
        content: MTRC(redirect).tree
      },
      {
        label: 'Regexp',
        content: MTRC(regexp).tree
      },
      {
        label: 'Hyperlinks',
        content: MTRC(hyperlinks).tree
      },
      {
        label: 'Transitions',
        content: MTRC(transitions).tree
      }
    ]
  },
  {
    label: 'Testing',
    icon: 'check-circle-o', // tnr: what icon should we use here?
    content: MTRC(testing).tree
  },
  {
    label: 'Best Practices',
    icon: 'heart',
    content: MTRC(bestPractices).tree,
    subContent: [
      {
        label: 'Structure',
        content: MTRC(structure).tree
      },
      {
        label: 'Relational data',
        content: MTRC(relational).tree
      },
      {
        label: 'Props and State',
        content: MTRC(propsAndState).tree
      },
      {
        label: 'Responsibilities',
        content: MTRC(responsibilities).tree
      }
    ]
  }, {
    label: 'Contributors',
    icon: 'users',
    content: Contributors
  }
];
