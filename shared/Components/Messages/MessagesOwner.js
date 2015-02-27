var React = require('react');
var StateMixin = require('react-router').State;

var requestMessage = function (params) {
  messageActions.read(params.roomId);
  initializer.handle([LikesOwner]);
};

var initializer = require('react-router-initializer');
var initializerMixin = initializer.generateMixin(requestMessage);

var messageActions = require('../../Actions/messageActions');
var messageStore = require('../../Stores/messageStore');
var Message = require('./Message');
var LikesOwner = require('../Likes/LikesOwner');
var ReusableForm = require('../ReusableForm');

var MessagesOwner = React.createClass({
  mixins:[StateMixin, initializerMixin],

  getInitialState: function () {
    var roomId = this.getParams().roomId;
    return {
      currentRoomId: roomId,
      messages: messageStore.getAllForRoom(roomId)
    };
  },

  listenerCallback: function () {
    this.setState(this.getInitialState());
  },

  componentDidMount: function () {
    messageStore.addChangeListener(this.listenerCallback);
    requestMessage(this.getParams());
  },

  componentWillReceiveProps: function () {
    if (this.getParams().roomId !== this.state.currentRoomId) {
      this.listenerCallback();
    }
  },

  componentWillUnmount: function () {
    messageStore.removeChangeListener(this.listenerCallback);
  },

  createMessage: function (text) {
    var message = {
      text: text,
      roomId: this.getParams().roomId
    };
    messageActions.create(message);
  },

  updateMessage: function (message, newMessage) {
    messageActions.update(message, newMessage);
  },

  deleteMessage: function (message) {
    messageActions.delete(message);
  },

  render: function () {
    var messages = Object.keys(this.state.messages).sort(function (a,b) {return a-b;}).map(function (messageId) {
      var message = this.state.messages[messageId];
      return <Message key={message.id} message={message} handleUpdate={this.updateMessage} handleDelete={this.deleteMessage} />
    });

    return (
      <div>
        <ReusableForm handleSubmit={this.createMessage} placeholder='create message' />
        {messages}
      </div>
    );
  }
});

module.exports = MessagesOwner;
