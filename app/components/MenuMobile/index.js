import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import classnames from 'classnames';
import {
  fromUrlName,
  toUrlName
} from '../../utils';

@Cerebral({
  currentDocument: 'currentDocument',
  menu: 'menu'
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
      <a
        key={itemIndex}
        className={className}
        href={`/documentation/${docUrlName}`}
      >
        {itemKey}
      </a>
    );
  }
  renderMenuSection(sectionKey, section, sectionIndex) {
    const doc = fromUrlName(this.props.currentDocument);
    const sectionHasDocument = section.indexOf(doc) >= 0;
    const className = classnames(styles.section, {
      [styles.activeSection]: sectionHasDocument
    });

    return (
      <div key={sectionIndex} className={className}>
        <div
          onClick={() => this.props.signals.documentClicked({
            doc: toUrlName(section[0])
          })}
        >
          {sectionKey}
        </div>

        {
          sectionHasDocument ?
            section.map((key, index) => (
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
      <div className={styles.wrapper}>
        <div className={styles.closeButtonWrapper}>
          <button className={styles.closeButton} onClick={() => this.props.signals.closeMenuButtonClicked()}>x</button>
        </div>
        {Object.keys(this.props.menu).map((key, index) => (
          this.renderMenuSection(key, this.props.menu[key], index)
        ))}
      </div>
    );
  }
}

 export default Menu;
