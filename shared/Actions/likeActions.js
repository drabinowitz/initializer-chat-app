var appDispatcher = require('../Dispatcher/appDispatcher');
var likeConstants = require('../Constants/likeConstants');
var App = require('../App');
var initializer = require('react-router-initializer');
var messageActions = require('./messageActions');

module.exports = {
  create: function (like) {
    App.fetcher.createAsync('like', {like: like}, {}, {}).then(function (like) {
      appDispatcher.dispatchViewAction({
        type: likeConstants.CREATE_LIKE,
        body: {
          like: like
        }
      });
    });
  },
  read: function () {
    var fetchLike = messageActions.fetchMessage
      .then(function (messages) {
        var messageIds = Object.keys(messages);
        return App.fetcher.readAsync('like', {messageIds: messageIds}, {});
      })
      .then(function (likes) {
        appDispatcher.dispatchViewAction({
          type: likeConstants.READ_LIKE,
          body: {
            likes: likes
          }
        });

        return likes;
      });

    this.fetchLike = fetchLike;
    initializer.register(fetchLike);
  },
  delete: function (like) {
    App.fetcher.deleteAsync('like', {like: like}, {}).then(function (like) {
      appDispatcher.dispatchViewAction({
        type: likeConstants.DELETE_LIKE,
        body: {
          like: like
        }
      });
    });
  }
};
