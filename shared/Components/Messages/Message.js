var React = require('react');

var Message = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <div>
        <h3>{message.text}</h3>
      </div>
    );
  }
});

module.exports = Message;
