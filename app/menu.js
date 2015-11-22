import MTRC from 'markdown-to-react-components';
import Home from './Home.js';
import install from './markdown/install.md';
import react from './markdown/react.md';
import angular from './markdown/angular.md';
import baobab from './markdown/baobab.md';
import tcomb from './markdown/tcomb.md';
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
import recording from './markdown/recording.md';
import getStarted from './markdown/get-started.md';
import utilities from './markdown/utilities.md';
import relational from './markdown/relational.md';
import internetExplorer from './markdown/internetExplorer.md';
import propsAndState from './markdown/propsAndState.md';
import responsibilities from './markdown/responsibilities.md';
import compute from './markdown/compute.md';
import immutableJS from './markdown/immutableJS.md';
import faq from './markdown/faq.md';
import contributors from './markdown/contributors.md';
import howto from './markdown/howto.md';
import serverRequests from './markdown/serverRequests.md';

export default [
  {
    label: 'Cerebral',
    icon: 'home',
    content: Home
  }, {
    label: 'Contributors',
    icon: 'users',
    content: MTRC(contributors).tree
  }, {
    label: 'Install',
    icon: 'download',
    content: MTRC(install).tree
  }, [
    {
      label: 'React',
      icon: 'television',
      content: MTRC(react).tree
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
      label: 'Tcomb',
      icon: 'database',
      content: MTRC(tcomb).tree
    },
    {
      label: 'Internet Explorer',
      icon: 'internet-explorer',
      content: MTRC(internetExplorer).tree
    }
  ],
  {
    label: 'Get Started',
    icon: 'power-off',
    content: MTRC(getStarted).tree
  },
  {
    label: 'How to',
    icon: 'graduation-cap',
    content: MTRC(howto).tree
  }, [{
    label: 'Server requests',
    content: MTRC(serverRequests).tree
  }],
  {
    label: 'FAQ',
    icon: 'question',
    content: MTRC(faq).tree
  },
  {
    label: 'Signals',
    icon: 'file-text',
    content: MTRC(signals).tree
  },
  [
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
  ],
  {
    label: 'Utilities',
    icon: 'wrench',
    content: MTRC(utilities).tree
  },
  [
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
      label: 'Recording',
      content: MTRC(recording).tree
    }
  ],
  {
    label: 'Routing',
    icon: 'map-signs',
    content: MTRC(routing).tree
  }, [
    {
      label: 'Transitions',
      content: MTRC(transitions).tree
    }
  ],
  {
    label: 'Best Practices',
    icon: 'heart',
    content: MTRC(bestPractices).tree
  }, [
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
];
