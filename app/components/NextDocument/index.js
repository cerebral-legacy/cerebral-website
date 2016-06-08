import React from 'react';
import styles from './styles.css';
import {Decorator as Cerebral} from 'cerebral-view-react';

import {
  fromUrlName
} from '../../utils';

@Cerebral()
class NextDocument extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.pusher} />
        <div
          className={styles.nextWrapper}
          onClick={() => {
            this.props.signals.documentClicked({
              doc: this.props.name
            })
          }}
        >
          <div className={styles.next}>Next</div>
          <div className={styles.doc}>{fromUrlName(this.props.name)}</div>
        </div>
      </div>
    );
  }
}

export default NextDocument;
