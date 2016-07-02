import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Front from '../Front';
import Documentation from '../Documentation';
import Footer from '../Footer';

const pages = {
  front: Front,
  documentation: Documentation
};

@Cerebral({
  currentPage: 'currentPage'
})
class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      document.body.scrollTop = 0;
    }
  }
  render() {
    const Page = pages[this.props.currentPage];

    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.appClicked()}>
        <Page />
        <Footer />
      </div>
    );
  }
}

 export default App;
