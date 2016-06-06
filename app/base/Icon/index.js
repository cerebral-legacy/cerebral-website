import React from 'react';
import styles from './styles.css';
import classnames from 'classnames';
import icons from '../../common/icons.css';

function Icon(props) {
  const className = classnames({
    [styles.normal]: true,
    [styles.large]: props.size === 2,
    [styles.larger]: props.size === 3,
    [styles.click]: Boolean(props.onClick)
  });
  return (
    <div
      {...props}
      className={classnames(icons[props.icon], className, props.className)}
    />
  );
}

export default Icon;
