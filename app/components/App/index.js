import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Header from 'base/Header';
import Tabs from '../Tabs';
import Markdown from '../Markdown';
import Icon from 'base/Icon';

@Cerebral()
class App extends React.Component {
  trackScrolling() {

  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.mainHeader}>
          <img height="50%" src="/cerebral.png" />
          <div className={styles.title}>Cerebral</div>
          <div className={styles.subTitle}>makes sense of complex apps</div>
          <div className={styles.buttonContainer}>
            <div className={styles.button}>TRY THE DEMO</div>
            <div className={styles.button}>GET STARTED</div>
            <div className={styles.button}>DOCUMENTATION</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <Markdown filename="front_model.md" />
            <Tabs tabs={[{
              label: 'main.js',
              render: () => <Markdown filename="front_model_code.md" />
            }, {
              label: 'Debugger',
              render: () => <Markdown filename="front_model_debugger.md" />
            }]} />
          </div>
          <div className={styles.row}>
            <Tabs tabs={[{
              label: 'appMounted.js',
              render: () => <Markdown filename="front_controller_code.md" />
            }, {
              label: 'Debugger',
              render: () => <Markdown filename="front_controller_debugger.md" />
            }]} />
            <Markdown filename="front_controller.md" />
          </div>
        </div>
      </div>
    );
  }
}

 export default App;
