import React from 'react';
import menu from './menu';
import {Decorator as Cerebral} from 'cerebral-react';
import toPath from './toPath';

@Cerebral({
  showOverlay: ['showOverlay'],
  displayMenu: ['displayMenu'],
  content: ['content'],
  subContent: ['subContent'],
  videoSrc: ['videoSrc'],
  transitionVideo: ['transitionVideo']
})
class App extends React.Component {
  static propTypes = {
    showOverlay: React.PropTypes.bool,
    displayMenu: React.PropTypes.bool,
    content: React.PropTypes.string,
    subContent: React.PropTypes.string,
    signals: React.PropTypes.object,
    videoSrc: React.PropTypes.any
  }
  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content || prevProps.subContent !== this.props.subContent) {
      this.refs.content.scrollTop = 0;
    }
  }
  openGithub() {
    window.open('http://www.github.com/cerebral/cerebral');
  }
  createTweet() {
    window.open('https://twitter.com/share');
  }
  openChat() {
    window.open('https://discord.gg/0kIweV4bd2bwwsvH');
  }
  openRepo() {
    window.open('https://github.com/cerebral/cerebral-website/tree/master/app/markdown');
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

    menu.forEach((item) => {
      if (toPath(item.label) === this.props.content) {
        if (this.props.subContent) {
          item.subContent.forEach((subItem) => {
            if (toPath(subItem.label) === this.props.subContent) {
              Content = subItem.content;
            }
          });
        } else {
          Content = item.content;
        }
      }
    });

    Content = typeof Content === 'function' ? <Content openVideo={(videoSrc) => this.props.signals.videoOpened({videoSrc})}/> : <div>{Content}</div>;

    return (
      <div className="page" style={pageStyle}>
        <div className="header" style={headerStyle}>
          <i className="icon icon-bars link" onClick={() => this.props.signals.menuToggled()} style={{margin: 10}}></i>
          <div className="github" onClick={() => this.openRepo()}>
            <i className="icon icon-pencil"> Edit page</i>
          </div>
          <div className="tweet" onClick={() => this.openGithub()}>
            <i className="icon icon-github-square"> Project repo</i>
          </div>
          <div className="tweet" onClick={() => this.createTweet()}>
            <i className="icon icon-twitter"> Tweet it!</i>
          </div>
          <div className="tweet" onClick={() => this.openChat()}>
            <i className="icon icon-comments"> Chat with us</i>
          </div>
          <div className="tweet" onClick={() => location.href = "/todomvc"}>
            <i className="icon icon-gamepad"> Demo</i>
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
    return (
      <ul className="menu">
        {menu.map((item, index) => {
          const Item = (
            <li
              key={item.label}
              onClick={() => index === 0 ? this.props.signals.homeOpened() : this.props.signals.menuClicked({content: toPath(item.label)})}
              className={this.props.content === toPath(item.label) ? this.props.subContent !== null ? 'active head' : 'active' : null}>
              <i className={'icon icon-' + item.icon}/> {item.label}
            </li>
          );

          if (item.subContent && this.props.content === toPath(item.label)) {
            return [
              Item,
              <li key={item.label + '_sub'}>
                <ul className="submenu">
                  {item.subContent.map((subitem, subitemIndex) => {
                    return (
                      <li
                        key={subitemIndex}
                        onClick={() => this.props.signals.submenuClicked({content: toPath(item.label), subContent: toPath(subitem.label)})}
                        className={this.props.content === toPath(item.label) && this.props.subContent === toPath(subitem.label) ? 'active' : null}>
                        {
                          subitem.icon ?
                            <span><i className={'icon icon-' + subitem.icon}/> {subitem.label}</span>
                          :
                            '• ' + subitem.label
                        }
                      </li>
                    );
                  })}
                </ul>
              </li>
            ];
          }

          return Item;
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
