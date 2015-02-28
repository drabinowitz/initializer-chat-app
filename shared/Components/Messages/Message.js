var React = require('react');

var ReusableForm = require('../ReusableForm');
var LikesOwner = require('../Likes/LikesOwner');

var Message = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    handleUpdate: React.PropTypes.func.isRequired,
    handleDelete: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      editing: false
    };
  },

  showEdit: function () {
    this.setState({
      editing: true
    });
  },

  onUpdate: function (newText) {
    this.setState({
      editing: false
    });

    var newMessage = {
      id: this.props.message.id,
      roomId: this.props.message.roomId,
      text: newText
    };

    this.props.handleUpdate(this.props.message, newMessage);
  },

  onDelete: function () {
    this.props.handleDelete(this.props.message);
  },

  render: function () {
    var toShow;
    if (this.state.editing) {
      toShow = (
        <ReusableForm handleSubmit={this.onUpdate} defaultValue={this.props.message.text} />
      );
    } else {
      toShow = (
        <h3>{this.props.message.text}</h3>
      );
    }
    return (
      <div>
        {toShow}
        <button onClick={this.showEdit}>Edit</button>
        <button onClick={this.onDelete}>Delete</button>
        <LikesOwner messageId={this.props.message.id} />
      </div>
    );
  }
});

module.exports = Message;
