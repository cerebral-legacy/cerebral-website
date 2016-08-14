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
            <a
              className={styles.link}
              href="/contributors"
            >
              Contributors
            </a>
            <a href="https://twitter.com/cerebraljs" className="twitter-follow-button" data-show-count="false">Follow @cerebraljs</a>
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              Articles and useful links
            </div>
            <a
              className={styles.link}
              href="https://github.com/cerebral/cerebral-reference-app"
              target="_new"
            >
              Real life Cerebral project
            </a>
            <a
              className={styles.link}
              href="https://gist.github.com/christianalfoni/e8dc5bfa79e7289a6258"
              target="_new"
            >
              Redux and Cerebral
            </a>
            <a
              className={styles.link}
              href="http://www.webpackbin.com"
              target="_new"
            >
              www.webpackbin.com <small>(Cerebral app)</small>
            </a>
            <a
              className={styles.link}
              href="http://www.christianalfoni.com"
              target="_new"
            >
              www.christianalfoni.com
            </a>
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              Help
            </div>
            <a
              className={styles.link}
              href="https://github.com/cerebral/cerebral"
            >
              Cerebral Github Repo
            </a>
            <a
              className={styles.link}
              href="https://discord.gg/0kIweV4bd2bwwsvH"
            >
              Discord chat
            </a>
            <a
              className={styles.link}
              onClick={() => window.open('/oldsite')}
            >
              Old Cerebral website
            </a>
          </div>
        </div>
      </div>
    );
  }
}

 export default Footer;
