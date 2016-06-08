import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Menu from '../Menu';
import GetStarted from './GetStarted';
import StructuringState from './StructuringState';

const pages = {
  'get_started': GetStarted,
  'structuring_state': StructuringState
};

@Cerebral({
  currentDocument: 'currentDocument'
})
class Documentation extends React.Component {
  render() {
    const Page = pages[this.props.currentDocument];

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
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
