var React = require('react');

var Header = React.createClass({
  render: function () {
    return (
      <div className="headstyle">
        <h6>{this.props.children}</h6>
      </div>
    );
  }
});

module.exports = Header;
