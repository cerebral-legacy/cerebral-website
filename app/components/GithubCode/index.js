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
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', (event) => {
      this.setState({
        code: event.target.responseText
      });
    });
    oReq.open('GET', this.props.url);
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
    let filename = this.props.url.replace('https://raw.githubusercontent.com/cerebral/cerebral-website-tutorial/', '');
    filename = filename.split('/').slice(1).join('/');

    return (
      <div>
        {MTRC('*' + filename + '*\n\`\`\`javascript\n' + this.state.code + '\n\`\`\`').tree}
      </div>
    );
  }
}

 export default GithubCode;
