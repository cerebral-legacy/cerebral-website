import React from 'react';
import menu from './menu';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({
  showOverlay: ['showOverlay'],
  displayMenu: ['displayMenu'],
  itemIndex: ['itemIndex'],
  subitemIndex: ['subitemIndex'],
  videoSrc: ['videoSrc'],
  transitionVideo: ['transitionVideo']
})
class App extends React.Component {
  static propTypes = {
    showOverlay: React.PropTypes.bool,
    displayMenu: React.PropTypes.bool,
    itemIndex: React.PropTypes.any,
    subitemIndex: React.PropTypes.any,
    signals: React.PropTypes.object,
    videoSrc: React.PropTypes.any
  }
  componentDidUpdate(prevProps) {
    if (prevProps.itemIndex !== this.props.itemIndex || prevProps.subItemIndex !== this.props.subitemIndex) {
      this.refs.content.scrollTop = 0;
    }
  }
  openGithub() {
    window.open('http://www.github.com/christianalfoni/cerebral');
  }
  createTweet() {
    window.open('https://twitter.com/share');
  }
  openChat() {
    window.open('https://gitter.im/christianalfoni/cerebral');
  }
  openRepo() {
    window.open('https://github.com/christianalfoni/cerebral-website');
  }
  renderPage() {
    const pageStyle = {
      transform: 'translate3d(' + (this.props.displayMenu ? '200px' : '0') + ', 0, 0)',
      WebkitTransform: 'translate3d(' + (this.props.displayMenu ? '200px' : '0') + ', 0, 0)'
    };
    const headerStyle = {
      paddingRight: this.props.displayMenu ? 200 : 0
    };
    const contentStyle = {
      paddingRight: this.props.displayMenu ? 240 : 40
    };

    let Content;

    if (typeof this.props.subitemIndex === 'number') {
      Content = menu[this.props.itemIndex + 1][this.props.subitemIndex].content;
    } else {
      Content = menu[this.props.itemIndex].content;
    }

    Content = typeof Content === 'function' ? <Content openVideo={(videoSrc) => this.props.signals.videoOpened({videoSrc})}/> : <div>{Content}</div>;

    return (
      <div className="page" style={pageStyle}>
        <div className="header" style={headerStyle}>
          <i className="icon icon-bars link" onClick={() => this.props.signals.menuToggled()} style={{margin: 10}}></i>
          <div className="github" onClick={() => this.openRepo()}>
            <i className="icon icon-pencil"> Edit the page</i>
          </div>
          <div className="tweet" onClick={() => this.openGithub()}>
            <i className="icon icon-github-square"> Github Project</i>
          </div>
          <div className="tweet" onClick={() => this.createTweet()}>
            <i className="icon icon-twitter"> Tweet about Cerebral</i>
          </div>
          <div className="tweet" onClick={() => this.openChat()}>
            <i className="icon icon-comments"> Talk to us on Gitter</i>
          </div>
        </div>
        <div ref="content" className="content" style={contentStyle}>
          <div className="content-wrapper">
            {Content}
          </div>
        </div>
      </div>
    );
  }
  renderMenu() {
    let lastItemIndex = null;

    return (
      <ul className="menu">
        {menu.map((item, itemIndex) => {
          if (Array.isArray(item)) {
            return (
              <li key={itemIndex}>
                <ul className="submenu">
                  {item.map((subitem, subitemIndex) => {
                    const scopedItemIndex = lastItemIndex;

                    return (
                      <li
                        key={subitemIndex}
                        onClick={() => this.props.signals.submenuClicked({itemIndex: scopedItemIndex, subitemIndex})}
                        className={this.props.itemIndex === lastItemIndex && this.props.subitemIndex === subitemIndex ? 'active' : null}>
                        {
                          subitem.icon ?
                            <span><i className={'icon icon-' + subitem.icon}/> {subitem.label}</span>
                          :
                            subitem.label
                        }
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }

          lastItemIndex = itemIndex;

          return (
            <li
              key={itemIndex}
              onClick={() => this.props.signals.menuClicked({itemIndex})}
              className={this.props.itemIndex === itemIndex ? this.props.subitemIndex !== null ? 'active head' : 'active' : null}>
              <i className={'icon icon-' + item.icon}/> {item.label}
            </li>
          );
        })}
      </ul>
    );
  }
  render() {
    const VideoWrapperStyle = {
      opacity: this.props.transitionVideo ? '0.8' : '0'
    };
    const VideoStyle = {
      opacity: this.props.transitionVideo ? '1' : '0'
    };

    return (
      <div style={{height: '100%'}}>
        {this.renderMenu()}
        {this.renderPage()}
        {
          this.props.showOverlay ?
            <div className="overlay" style={VideoWrapperStyle} onClick={() => this.props.signals.videoClosed()}></div>
          :
            null
        }
        {
          this.props.showOverlay ?
            <div className="videoframe" style={VideoStyle}>
              <iframe width="900" height="506" src={this.props.videoSrc + '?autoplay=1'} frameBorder="0" allowFullscreen></iframe>
            </div>
          :
            null
        }
      </div>
    );
  }
}

export default App;
