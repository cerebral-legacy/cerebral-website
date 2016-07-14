import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

@Cerebral()
class Footer extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.header}>
              Organization
            </div>
            <div
              className={styles.link}
              onClick={() => this.props.signals.contributorsClicked()}
            >
              Contributors
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              Articles and useful links
            </div>
            <div
              className={styles.link}
              onClick={() => window.open('https://github.com/cerebral/cerebral-reference-app')}
            >
              Real life Cerebral project
            </div>
            <div
              className={styles.link}
              onClick={() => window.open('https://gist.github.com/christianalfoni/e8dc5bfa79e7289a6258')}
            >
              Redux and Cerebral
            </div>
            <div
              className={styles.link}
              onClick={() => window.open('http://www.webpackbin.com')}
            >
              www.webpackbin.com <small>(Cerebral app)</small>
            </div>
            <div
              className={styles.link}
              onClick={() => window.open('http://www.christianalfoni.com')}
            >
              www.christianalfoni.com
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              Help
            </div>
            <div
              className={styles.link}
              onClick={() => window.open('https://github.com/cerebral/cerebral')}
            >
              Cerebral Github Repo
            </div>
            <div
              className={styles.link}
              onClick={() => window.open('https://discord.gg/0kIweV4bd2bwwsvH')}
            >
              Discord chat
            </div>
          </div>
        </div>
      </div>
    );
  }
}

 export default Footer;
