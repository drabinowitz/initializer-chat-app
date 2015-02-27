var appDispatcher = require('../Dispatcher/appDispatcher');
var messageConstants = require('../Constants/messageConstants');
var App = require('../App');
var initializer = require('react-router-initializer');

module.exports = {
  create: function (message) {
    App.fetcher.createAsync('message', {message: message}).then(function (message) {
      appDispatcher.dispatchViewAction({
        type: messageConstants.CREATE_MESSAGE,
        body: {
          message: message
        }
      });
    });
  },
  read: function (roomId) {
    var fetchMessage = App.fetcher.readAsync('message', {roomId: roomId}).then(function (messages) {
      appDispatcher.dispatchViewAction({
        type: messageConstants.READ_MESSAGE,
        body: {
          messages: messages
        }
      });
      return messages;
    });

    this.fetchMessage = fetchMessage;
    initializer.register(fetchMessage);
  },
  update: function (message, newMessage) {
    App.fetcher.updateAsync('message', {message: message, newMessage: newMessage}).then(function (newMessage) {
      appDispatcher.dispatchViewAction({
        type: messageConstants.UPDATE_MESSAGE,
        body: {
          message: message,
          newMessage: newMessage
        }
      });
    });
  },
  delete: function (message) {
    App.fetcher.deleteAsync('message', {message: message}).then(function (message) {
      appDispatcher.dispatchViewAction({
        type: messageConstants.DELETE_MESSAGE,
        body: {
          message: message
        }
      });
    });
  }
};
