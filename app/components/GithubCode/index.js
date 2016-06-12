import React from 'react';
import MTRC from 'markdown-to-react-components';
import styles from './styles.css';

class GithubCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {code: null};
  }
  componentDidMount() {
    this.getCode();
  }
  getCode(url) {
    const rawUrl = this.props.url
      .replace(
        'https://github.com/cerebral/cerebral-website-tutorial-basic/blob',
        'https://raw.githubusercontent.com/cerebral/cerebral-website-tutorial-basic'
      )
      .replace(
        'https://github.com/cerebral/cerebral-website-tutorial-next/blob',
        'https://raw.githubusercontent.com/cerebral/cerebral-website-tutorial-next'
      )
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', (event) => {
      this.setState({
        code: event.target.responseText
      });
    });
    oReq.open('GET', rawUrl);
    oReq.send();
  }
  render() {
    if (!this.state.code) {
      return (
        <div className={styles.loadingCode}>
          Loading code...
        </div>
      );
    }
    let filename = this.props.url
      .replace('https://github.com/cerebral/cerebral-website-tutorial-basic/blob/', '')
      .replace('https://github.com/cerebral/cerebral-website-tutorial-next/blob/', '');
    filename = filename.split('/').slice(1).join('/');

    return (
      <div>
        {MTRC('[' + filename + '](' + this.props.url + ')\n\`\`\`javascript\n' + this.state.code + '\n\`\`\`').tree}
      </div>
    );
  }
}

 export default GithubCode;
