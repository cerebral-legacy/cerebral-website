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
  'context_providers': ContextProviders,
  'data_and_ux': DataAndUX,
  'computed': Computed,
  'get_started': GetStarted,
  'choosing_a_project_type': ChoosingAProjectType,
  'choosing_a_model': ChoosingAModel,
  'choosing_a_view': ChoosingAView,
  'structuring_your_project': StructuringYourProject,
  'the_debugger': TheDebugger,
  'going_to_production': GoingToProduction
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
