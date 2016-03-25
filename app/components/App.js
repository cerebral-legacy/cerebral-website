import React from 'react';
import menu from '../menu';
import {Decorator as Cerebral} from 'cerebral-view-react';
import utils from '../utils';
import classnames from 'classnames';
import Header from './Header';

@Cerebral({
  showOverlay: ['showOverlay'],
  displayMenu: ['displayMenu'],
  content: ['content'],
  subContent: ['subContent'],
  videoSrc: ['videoSrc'],
  transitionVideo: ['transitionVideo']
})
class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content || prevProps.subContent !== this.props.subContent) {
      this.refs.content.scrollTop = 0;
    }
  }
  renderPage() {
    let page;
    menu.forEach((item) => {
      if (utils.toPath(item.label) === this.props.content) {
        if (this.props.subContent) {
          item.subContent.forEach((subItem) => {
            if (utils.toPath(subItem.label) === this.props.subContent) {
              page = subItem;
            }
          });
        } else {
          page = item;
        }
      }
    });

    let Content = page.content;
    const props = this.props;
    if (typeof page.content === 'function') {
      Content = page.content({
        openVideo: videoSrc => props.signals.videoOpened({videoSrc})
      });
    } else {
      Content = (
        <div>
          {
            page.video ?
              <h1>
                {page.label} -
                <span className="title-video" onClick={() => this.props.signals.videoOpened({videoSrc: page.video})}>
                    <i className="icon icon-play-circle-o"/>
                    <span> play video</span>
                </span>
              </h1>
            :
              <h1>{page.label}</h1>
          }
          {Content}
        </div>
      );
    }

    return (
      <div className="page">
        <div ref="content" className="content">
          <div className="content-wrapper container">
            {Content}
          </div>
        </div>
      </div>
    );
  }
  renderMenu() {
    const classes = classnames('menu', {
      active: this.props.displayMenu
    });

    return (
      <ul className={classes}>
        {menu.map((item, index) => {
          const Item = (
            <li
              key={item.label}
              onClick={() => index === 0 ? this.props.signals.homeOpened() : this.props.signals.menuClicked({content: utils.toPath(item.label)})}
              className={this.props.content === utils.toPath(item.label) ? this.props.subContent !== null ? 'active head' : 'active' : null}>
              <i className={'icon icon-' + item.icon}/> {item.label}
            </li>
          );

          if (item.subContent && this.props.content === utils.toPath(item.label)) {
            return [
              Item,
              <li key={item.label + '_sub'}>
                <ul className="submenu">
                  {item.subContent.map((subitem, subitemIndex) => {
                    return (
                      <li
                        key={subitemIndex}
                        onClick={() => this.props.signals.submenuClicked({content: utils.toPath(item.label), subContent: utils.toPath(subitem.label)})}
                        className={this.props.content === utils.toPath(item.label) && this.props.subContent === utils.toPath(subitem.label) ? 'active' : null}>
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

    const classes = classnames('page-container', {
      'menu-open': this.props.displayMenu
    });

    const overlayMenuClasses = classnames('mobile-overlay', {
      active: this.props.displayMenu
    });

    return (
      <div onClick={() => this.props.signals.appClicked()}>
        <Header/>
        <div className={overlayMenuClasses} onClick={() => this.props.signals.menuToggled()}></div>
        <div className="navigation-container">{this.renderMenu()}</div>
        <div className={classes}>{this.renderPage()}</div>
        {this.props.showOverlay ? (
          <div className="overlay" style={VideoWrapperStyle} onClick={() => this.props.signals.videoClosed()}></div>
        ) : null}
        {this.props.showOverlay ? (
          <div className="videoframe" style={VideoStyle}>
            <iframe width={document.body.offsetWidth > 1000 ? 900 : 300} height={document.body.offsetWidth > 1000 ? 506 : 169} src={this.props.videoSrc + '?autoplay=1'} frameBorder="0" allowFullScreen></iframe>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
