import React from 'react';
import MTRC from 'markdown-to-react-components';
import {Decorator as Cerebral} from 'cerebral-view-react';

@Cerebral({
  githubPages: 'githubPages'
})
class GithubPage extends React.Component {
  componentDidMount() {
    if (!this.hasLoaded()) {
      this.props.signals.githubPageOpened({url: this.props.url});
    }
  }
  componentDidUpdate() {
    if (!this.hasLoaded()) {
      this.props.signals.githubPageOpened({url: this.props.url});
    }
  }
  hasLoaded() {
    return this.props.url in this.props.githubPages;
  }
  render() {
    if (!this.hasLoaded()) {
      return (
        <div className="githubpage-loading">Loading...</div>
      );
    }
    return (
      <div>
        {MTRC(this.props.githubPages[this.props.url]).tree}
      </div>
    );
  }
}

export default GithubPage;
