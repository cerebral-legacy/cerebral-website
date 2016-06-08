import React from 'react';
import styles from './styles.css';
import classnames from 'classnames';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeTabIndex: 0};
  }
  onTabClick(index) {
    this.setState({
      activeTabIndex: index
    });
  }
  renderTab(tab, index) {
    const className = classnames({
      [styles.tab]: true,
      [styles.activeTab]: index === this.state.activeTabIndex
    });
    return (
      <div
        className={className}
        key={index}
        onClick={() => this.onTabClick(index)}
      >
        {tab.label}
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className={styles.tabs}>
          {this.props.tabs.map(this.renderTab.bind(this))}
        </div>
        {this.props.tabs.map((tab, index) => {
          return (
            <div key={index} style={{display: index === this.state.activeTabIndex ? 'block' : 'none'}}>
              {tab.render()}
            </div>
          )
        })}
      </div>
    );
  }
}

 export default Tabs;
