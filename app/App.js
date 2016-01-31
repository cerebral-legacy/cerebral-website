import React from 'react';
import menu from './menu';
import {Decorator as Cerebral} from 'cerebral-react';
import toPath from './toPath';
import classnames from 'classnames';

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
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      query: ''
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content || prevProps.subContent !== this.props.subContent) {
      this.refs.content.scrollTop = 0;
    }
  }
  search(query) {
    if (query.length < 3) {
      return this.setState({
        searchResults: [],
        query: query
      });
    }
    const searchResults = menu.reduce((results, item) => {
      const extractHits = (currentItem) => {
        if (!currentItem.text) {
          return;
        }
        const hits = currentItem.text.toLowerCase().match(new RegExp(query, 'g'));

        if (hits && hits.length) {
          results.push({
            hitsCount: hits.length,
            label: currentItem.label,
            parent: item === currentItem ? null : item.label.toLowerCase()
          });
        }
      };

      extractHits(item);

      if (item.subContent) {
        item.subContent.forEach(extractHits);
      }

      return results;
    }, []);

    searchResults.sort((a, b) => {
      if (a.hitsCount > b.hitsCount) {
        return -1;
      }

      if (a.hitsCount < b.hitsCount) {
        return 1;
      }

      return 0;
    });

    this.setState({
      searchResults,
      query
    });
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
  renderHeader() {
    return (
      <div className="header">
        <i className="icon icon-bars link" onClick={() => this.props.signals.menuToggled()} style={{margin: 10}}></i>
        <div className="mobile-icon" />
        <ul>
          <li className="search">
            <i className="icon icon-search"/>
            <input className="search-input" value={this.state.query} onChange={(e) => this.search(e.target.value)}/>
            {
              this.state.searchResults.length ?
                <ul className="search-results">
                  {this.state.searchResults.map((result, index) => (
                    <li key={index} onClick={() => {
                      if (result.parent) {
                        this.props.signals.submenuClicked({
                          content: result.parent.replace(/\s/g, ''),
                          subContent: result.label.toLowerCase().replace(/\s/g, '')
                        });
                      } else {
                        this.props.signals.menuClicked({
                          content: result.label.toLowerCase().replace(/\s/g, '')
                        });
                      }
                    }}>
                      <strong>{result.label}</strong> ({result.hitsCount} hits)
                    </li>
                  ))}
                </ul>
              :
                null
            }
          </li>
          <li className="demo" onClick={() => location.href = "/todomvc"}>
            <i className="icon icon-gamepad" /> <span className="icon-label">Demo</span>
          </li>
          <li className="chat" onClick={() => this.openChat()}>
            <i className="icon icon-comments" /> <span className="icon-label">Chat</span>
          </li>
          <li className="twitter" onClick={() => this.createTweet()}>
            <i className="icon icon-twitter" /> <span className="icon-label">Tweet</span>
          </li>
          <li className="github" onClick={() => this.openGithub()}>
            <i className="icon icon-github-square" /> <span className="icon-label">Github</span>
          </li>
          <li className="edit" onClick={() => this.openRepo()}>
            <i className="icon icon-pencil" /> <span className="icon-label">Edit</span>
          </li>
        </ul>
      </div>
    );
  }

  renderPage() {
    let page;

    menu.forEach((item) => {
      if (toPath(item.label) === this.props.content) {
        if (this.props.subContent) {
          item.subContent.forEach((subItem) => {
            if (toPath(subItem.label) === this.props.subContent) {
              page = subItem;
            }
          });
        } else {
          page = item;
        }
      }
    });

    let Content = page.content;
    if (typeof page.content === 'function') {
       Content = <Content openVideo={(videoSrc) => this.props.signals.videoOpened({videoSrc})}/>
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
          <div className="content-wrapper">
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

    const classes = classnames('page-container', {
      'menu-open': this.props.displayMenu
    });

    return (
      <div onClick={() => this.setState({searchResults: [], query: ''})}>
        {this.renderHeader()}
        <div className="navigation-container">{this.renderMenu()}</div>
        <div className={classes}>{this.renderPage()}</div>
        {this.props.showOverlay ? (
          <div className="overlay" style={VideoWrapperStyle} onClick={() => this.props.signals.videoClosed()}></div>
        ) : null}
        {this.props.showOverlay ? (
          <div className="videoframe" style={VideoStyle}>
            <iframe width="900" height="506" src={this.props.videoSrc + '?autoplay=1'} frameBorder="0" allowFullscreen></iframe>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
