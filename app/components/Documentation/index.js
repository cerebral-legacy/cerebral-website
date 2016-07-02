import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Menu from '../Menu';
import Introduction from './Introduction';
import StructuringState from './StructuringState';
import DefiningSignals from './DefiningSignals';
import CreatingComponents from './CreatingComponents';
import AddingModules from './AddingModules';
import CreatingActions from './CreatingActions';
import AddingASharedModule from './AddingASharedModule';
import NextStep from './NextStep';
import Advanced from './Advanced';
import Routing from './Routing';
import CreatingAService from './CreatingAService';
import ContextProviders from './ContextProviders';
import DataAndUX from './DataAndUX';
import Computed from './Computed';
import GetStarted from './GetStarted';
import ChoosingAProjectType from './ChoosingAProjectType';
import ChoosingAModel from './ChoosingAModel';
import ChoosingAView from './ChoosingAView';
import StructuringYourProject from './StructuringYourProject';
import TheDebugger from './TheDebugger';
import GoingToProduction from './GoingToProduction';
import Controller from './Controller';
import Signals from './Signals';
import Actions from './Actions';
import Operators from './Operators';

const pages = {
  'introduction': Introduction,
  'structuring_state': StructuringState,
  'defining_signals': DefiningSignals,
  'creating_components': CreatingComponents,
  'adding_modules': AddingModules,
  'creating_actions': CreatingActions,
  'adding_a_shared_module': AddingASharedModule,
  'next_step': NextStep,
  'advanced': Advanced,
  'routing': Routing,
  'creating_a_service': CreatingAService,
  'context_providers': ContextProviders,
  'data_and_ux': DataAndUX,
  'computed': Computed,
  'get_started': GetStarted,
  'choosing_a_project_type': ChoosingAProjectType,
  'choosing_a_model': ChoosingAModel,
  'choosing_a_view': ChoosingAView,
  'structuring_your_project': StructuringYourProject,
  'the_debugger': TheDebugger,
  'going_to_production': GoingToProduction,
  'controller': Controller,
  'signals': Signals,
  'actions': Actions,
  'operators': Operators
};

@Cerebral({
  currentDocument: 'currentDocument'
})
class Documentation extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.currentDocument !== this.props.currentDocument) {
      document.body.scrollTop = 0;
    }
  }
  render() {
    const Page = pages[this.props.currentDocument];

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logoWrapper} onClick={() => this.props.signals.rootRouted()}>
            <img src="/cerebral.png" />
            <div className={styles.title}>Cerebral</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.menu}>
            <div className={styles.fixedMenuWrapper}>
              <Menu />
            </div>
          </div>
          <div className={styles.document}>
            {
              Page ?
                <Page />
              :
                null
            }
          </div>
        </div>
      </div>
    );
  }
}

 export default Documentation;
