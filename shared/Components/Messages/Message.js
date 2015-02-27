var React = require('react');

var LikesOwner = require('../Likes/LikesOwner');

var Message = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <div>
        <h3>{message.text}</h3>
        <LikesOwner messageId={message.id} />
      </div>
    );
  }
});

module.exports = Message;
