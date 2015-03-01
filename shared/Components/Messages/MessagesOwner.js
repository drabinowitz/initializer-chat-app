var React = require('react');
var StateMixin = require('react-router').State;

//request for message data based on the roomId param
var requestMessage = function (params) {
  messageActions.read(params.roomId);
  //handle the LikesOwner component will initializing
  initializer.handle([LikesOwner]);
};

var initializer = require('react-router-initializer');

//generate an initializer mixin with the request callback
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
      //store current route in state so we can check for route changes
      currentRoomId: roomId,
      messages: messageStore.getAllForRoomId(roomId)
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
    //generate new request whenever our routes change
    if (this.getParams().roomId !== this.state.currentRoomId) {
      requestMessage(this.getParams());
    }
  },

  componentWillUnmount: function () {
    messageStore.removeChangeListener(this.listenerCallback);
  },

  createMessage: function (text) {
    //geenerate new message with text input and room route id
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
    //Object.keys(this.state.messages) returns an array of our message ids
    //sort that array by ids so it has a consistent length
    //map the sorted array of ids to Message components
    var messages = Object.keys(this.state.messages).sort(function (a,b) {return a-b;}).map(function (messageId) {
      //get message corresponding to each id
      var message = this.state.messages[messageId];
      return (
        <Message key={message.id} message={message} handleUpdate={this.updateMessage} handleDelete={this.deleteMessage} />
      );
    }.bind(this));

    return (
      <div>
        <ReusableForm handleSubmit={this.createMessage} placeholder='create message' />
        {messages}
      </div>
    );
  }
});

module.exports = MessagesOwner;
