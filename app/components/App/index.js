import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Header from 'base/Header';
import Markdown from '../Markdown';

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
          <div className={styles.subTitle}>Make sense of complex apps</div>
          <div className={styles.buttonContainer}>
            <div className={styles.button}>GET STARTED</div>
            <div className={styles.button}>TRY THE DEMO</div>
          </div>
        </div>
        <div className={styles.content}>
          <Markdown filename="test.md" />
        </div>
      </div>
    );
  }
}

 export default App;
