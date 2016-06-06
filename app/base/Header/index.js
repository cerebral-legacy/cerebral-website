import React from 'react';
import styles from './styles.css';
import classnames from 'classnames';

function Header(props) {
  const className = classnames({
    [styles.header1]: !props.size || props.size === 1,
    [styles.header2]: props.size === 2,
    [styles.center]: Boolean(props.center)
  });

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

Header.propTypes = {
  children: React.PropTypes.any,
  size: React.PropTypes.number
};

export default Header;
