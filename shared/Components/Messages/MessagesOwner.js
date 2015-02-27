var React = require('react');
var StateMixin = require('react-router').State;

var requestMessage = function (params) {
  messageActions.read(params.roomId);
};

var initializerMixin = require('react-router-initializer').generateMixin(requestMessage);

var messageActions = require('../Actions/messageActions');
var messageStore = require('../Store/messageStore');

var Message = require('./Message');

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

  render: function () {
    var messages = this.state.messages.map(function (message) {
      return <Message key={message.id} message={message} />
    });

    return (
      <div>
        {messages}
      </div>
    );
  }
});

module.exports = MessagesOwner;
