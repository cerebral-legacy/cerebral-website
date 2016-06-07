import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import classnames from 'classnames';
import {
  fromUrlName,
  toUrlName
} from '../../utils';

import GetStarted from '../GetStarted';

const menu = {
  'Get started': {
    'Get started': GetStarted,
    'Structuring state': null,
    'Adding signals': null,
    'Creating components': null
  },
  'Next steps': {
    'Adding modules': null
  },
  'Advanced': {},
  'Api': {}
};

@Cerebral({
  currentDocument: 'currentDocument'
})
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.renderMenuSection = this.renderMenuSection.bind(this);
  }
  renderMenuItem(itemKey, itemIndex) {
    const doc = fromUrlName(this.props.currentDocument);
    const isDocument = itemKey === doc;
    const className = classnames(styles.item, {
      [styles.activeItem]: isDocument
    });
    const docUrlName = toUrlName(itemKey);

    return (
      <div
        key={itemIndex}
        className={className}
        onClick={() => this.props.signals.menuItemClicked({
          name: docUrlName
        })}
      >
        {itemKey}
      </div>
    );
  }
  renderMenuSection(sectionKey, section, sectionIndex) {
    const doc = fromUrlName(this.props.currentDocument);
    const sectionHasDocument = Boolean(section[doc]);
    const className = classnames(styles.section, {
      [styles.activeSection]: sectionHasDocument
    });
    return (
      <div key={sectionIndex} className={className}>
        <div>{sectionKey}</div>

        {
          sectionHasDocument ?
            Object.keys(section).map((key, index) => (
              this.renderMenuItem(key, index)
            ))
          :
            null
        }
      </div>
    );
  }
  render() {
    return (
      <div>
        {Object.keys(menu).map((key, index) => (
          this.renderMenuSection(key, menu[key], index)
        ))}
      </div>
    );
  }
}

 export default Menu;
