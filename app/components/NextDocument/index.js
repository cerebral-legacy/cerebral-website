import React from 'react';
import styles from './styles.css';
import {Decorator as Cerebral} from 'cerebral-view-react';
import classnames from 'classnames';

import {
  fromUrlName
} from '../../utils';

import icons from '../../common/icons.css';

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
          <div className={styles.contentWrapper}>
            <div>
              <div className={styles.next}>next</div>
              <div className={styles.doc}>{fromUrlName(this.props.name)}</div>
            </div>
            <div className={classnames(icons.next, styles.icon)} />
          </div>
        </div>
      </div>
    );
  }
}

export default NextDocument;
