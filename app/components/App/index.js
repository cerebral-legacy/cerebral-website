import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Header from 'base/Header';

@Cerebral()
class App extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <img width="300" src="/cerebral.png" />
        <Header>new Cerebral site coming soon</Header>
      </div>
    );
  }
}

 export default App;
