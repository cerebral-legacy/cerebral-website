import React from 'react';
import styles from './styles.css';

import {
  fromUrlName
} from '../../utils';

export default function NextDocument(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pusher} />
      <div className={styles.nextWrapper}>
        <div className={styles.next}>Next</div>
        <div className={styles.doc}>{fromUrlName(props.name)}</div>
      </div>
    </div>
  );
}
