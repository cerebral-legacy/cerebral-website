import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import classNames from 'classnames';

import Menu from '../Menu';
import MenuMobile from '../MenuMobile';
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
import EnhancingTheContext from './EnhancingTheContext';
import DataAndUX from './DataAndUX';
import ViewSpecificState from './ViewSpecificState';
import GetStarted from './GetStarted';
import TheWorkflow from './TheWorkflow';
import ChoosingAModel from './ChoosingAModel';
import ChoosingAView from './ChoosingAView';
import StructuringYourProject from './StructuringYourProject';
import TheDebugger from './TheDebugger';
import GoingToProduction from './GoingToProduction';
import Controller from './Controller';
import Signals from './Signals';
import Actions from './Actions';
import Operators from './Operators';
import Services from './Services';
import Modules from './Modules';
import Computed from './Computed';
import ContextProviders from './ContextProviders';
import CerebralModuleHttp from './CerebralModuleHttp';
import CerebralModuleForms from './CerebralModuleForms';
import CerebralModuleUseragent from './CerebralModuleUseragent';
import CerebralModuleRouter from './CerebralModuleRouter';
import CerebralModuleRecorder from './CerebralModuleRecorder';
import CerebralModuleFuse from './CerebralModuleFuse';
import CerebralModuleFirebase from './CerebralModuleFirebase';
import CerebralModuleFalcor from './CerebralModuleFalcor';
import CerebralProviderModules from './CerebralProviderModules';
import CerebralViewReact from './CerebralViewReact';
import CerebralViewSnabbdom from './CerebralViewSnabbdom';
import CerebralViewInferno from './CerebralViewInferno';
import Servercontroller from './Servercontroller';
import Modals from './Modals';

import icons from '../../common/icons.css';
import Sticky from 'react-stickynode';

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
  'enhancing_the_context': EnhancingTheContext,
  'data_and_ux': DataAndUX,
  'view_specific_state': ViewSpecificState,
  'get_started': GetStarted,
  'the_workflow': TheWorkflow,
  'choosing_a_model': ChoosingAModel,
  'choosing_a_view': ChoosingAView,
  'structuring_your_project': StructuringYourProject,
  'the_debugger': TheDebugger,
  'going_to_production': GoingToProduction,
  'controller': Controller,
  'signals': Signals,
  'actions': Actions,
  'operators': Operators,
  'services': Services,
  'modules': Modules,
  'computed': Computed,
  'context_providers': ContextProviders,
  'cerebral-module-http': CerebralModuleHttp,
  'cerebral-module-forms': CerebralModuleForms,
  'cerebral-module-useragent': CerebralModuleUseragent,
  'cerebral-module-router': CerebralModuleRouter,
  'cerebral-module-recorder': CerebralModuleRecorder,
  'cerebral-module-fuse': CerebralModuleFuse,
  'cerebral-module-firebase': CerebralModuleFirebase,
  'cerebral-module-falcor': CerebralModuleFalcor,
  'cerebral-provider-modules': CerebralProviderModules,
  'cerebral-view-react': CerebralViewReact,
  'cerebral-view-snabbdom': CerebralViewSnabbdom,
  'servercontroller': Servercontroller,
  'modals': Modals,
  'cerebral-view-inferno': CerebralViewInferno
};

@Cerebral({
  currentDocument: 'currentDocument',
  menuIsOpen: 'menuIsOpen'
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
        {this.props.menuIsOpen ? <MenuMobile /> : null}
        <div className={styles.header}>
          <button className={classNames(styles.menuButton, icons.menu)} onClick={(e) => {
            e.stopPropagation();
            this.props.signals.menuButtonClicked();
          }}></button>
          <div className={styles.logoWrapper}>
            <div className={styles.logo} onClick={() => this.props.signals.rootRouted()}>
              <img src="/cerebral.png" />
              <div className={styles.title}>Cerebral</div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Sticky top={`.${styles.header}`} bottomBoundary={`.${styles.content}`} className={styles.menu}>
            <Menu />
          </Sticky>
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
