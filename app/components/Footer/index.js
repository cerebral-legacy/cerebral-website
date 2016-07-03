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
            <div className={styles.link}>About</div>
            <div className={styles.link} onClick={() => this.props.signals.contributorsClicked()}>Contributors</div>
            <div className={styles.link}>Hire a Cerebral consultant</div>
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              Articles and useful links
            </div>
            <div className={styles.link}>Real life Cerebral project</div>
            <div className={styles.link}>Redux and Cerebral</div>
            <div className={styles.link}>www.christianalfoni.com</div>
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              Help
            </div>
            <div className={styles.link}>Cerebral Github Repo</div>
            <div className={styles.link}>Discord chat</div>
          </div>
        </div>
      </div>
    );
  }
}

 export default Footer;
