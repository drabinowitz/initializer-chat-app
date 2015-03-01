var appDispatcher = require('../Dispatcher/appDispatcher');
var messageConstants = require('../Constants/messageConstants');
var App = require('../App');
var initializer = require('react-router-initializer');

module.exports = {
  create: function (message) {
    //promise to create message from App fetcher
    App.fetcher.createAsync('message', {message: message}, {}, {}).then(function (message) {
      //dispatch message when the promise resolves
      appDispatcher.dispatchViewAction({
        type: messageConstants.CREATE_MESSAGE,
        body: {
          message: message
        }
      });
    });
  },
  read: function (roomId) {
    //promise to read messages in the room from App fetcher
    var fetchMessage = App.fetcher.readAsync('message', {roomId: roomId}, {}).then(function (messages) {
      //dispatch messages in the room when the promise resolves
      appDispatcher.dispatchViewAction({
        type: messageConstants.READ_MESSAGE,
        body: {
          messages: messages
        }
      });
      //return messages so that the promise can properly be chained
      return messages;
    });
    //store the promise so we can use it later (in this case likeActions uses it)
    this.fetchMessage = fetchMessage;
    //register the promise with initializer
    initializer.register(fetchMessage);
  },
  update: function (message, newMessage) {
    //promise to update the old message with the new message from App fetcher
    App.fetcher.updateAsync('message', {message: message, newMessage: newMessage}, {}, {}).then(function (newMessage) {
      //dispatch the old and new messages when the promise resolves
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
    //promise to delete the message from App fetcher
    App.fetcher.deleteAsync('message', {message: message}, {}).then(function (message) {
      //dispatch the message when the promise resolves
      appDispatcher.dispatchViewAction({
        type: messageConstants.DELETE_MESSAGE,
        body: {
          message: message
        }
      });
    });
  }
};
