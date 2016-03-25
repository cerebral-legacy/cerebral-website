import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Search from './Search';

@Cerebral()
class Header extends React.Component {
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
  render() {
    return (
      <div className="header">
        <i className="icon icon-bars link" onClick={() => this.props.signals.menuToggled()} style={{margin: 10}}></i>
        <div className="mobile-icon" />
        <ul>
          <Search/>
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
}

 export default Header;
