import React from 'react';
import MTRC from 'markdown-to-react-components';

class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {markdown: null};
    if (global.IS_NODE) {
      this.state = {markdown: require('../../markdown/' + props.filename)}
    }
  }
  getMarkdown(filename, cb) {
    require.ensure([], () => {
      cb(require('../../markdown/' + filename));
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.filename !== this.props.filename) {
      this.getMarkdown(nextProps.filename, markdown => {
        this.setState({
          markdown
        });
      });
    }
  }
  componentDidMount() {
    this.getMarkdown(this.props.filename, markdown => {
      this.setState({
        markdown
      });
    });
  }
  render() {
    if (!this.state.markdown) {
      return null;
    }
    return (
      <div>
        {MTRC(this.state.markdown).tree}
      </div>
    );
  }
}

 export default Markdown;
