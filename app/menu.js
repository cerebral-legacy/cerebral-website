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
      icon: 'file-text',
      content: MTRC(actions).tree
    },
    {
      label: 'Input',
      icon: 'file-text',
      content: MTRC(input).tree
    },
    {
      label: 'State',
      icon: 'file-text',
      content: MTRC(state).tree
    },
    {
      label: 'Output',
      icon: 'file-text',
      content: MTRC(output).tree
    },
    {
      label: 'Async',
      icon: 'file-text',
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
      icon: 'wrench',
      content: MTRC(services).tree
    },
    {
      label: 'Compute',
      icon: 'wrench',
      content: MTRC(compute).tree
    },
    {
      label: 'Factories',
      icon: 'wrench',
      content: MTRC(factories).tree
    },
    {
      label: 'Chains',
      icon: 'wrench',
      content: MTRC(chains).tree
    },
    {
      label: 'Type checking',
      icon: 'wrench',
      content: MTRC(typeChecking).tree
    },
    {
      label: 'Events',
      icon: 'wrench',
      content: MTRC(events).tree
    },
    {
      label: 'Recording',
      icon: 'wrench',
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
      icon: 'compress',
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
      icon: 'heart-o',
      content: MTRC(structure).tree
    },
    {
      label: 'Relational data',
      icon: 'heart-o',
      content: MTRC(relational).tree
    },
    {
      label: 'Props and State',
      icon: 'heart-o',
      content: MTRC(propsAndState).tree
    },
    {
      label: 'Responsibilities',
      icon: 'heart-o',
      content: MTRC(responsibilities).tree
    }
  ]
];
