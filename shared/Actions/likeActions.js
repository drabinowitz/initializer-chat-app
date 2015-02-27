var appDispatcher = require('../Dispatcher/appDispatcher');
var likeConstants = require('../Constants/likeConstants');
var fetcher = require('../App').fetcher;
var initializer = require('react-router-initializer');
var messageActions = require('./messageActions');

module.exports = {
  create: function (like) {
    fetcher.createAsync('like', {like: like}).then(function (like) {
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
        return fetcher.readAsync('like', {messageIds: messageIds});
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
    fetcher.deleteAsync('like').then(function (like) {
      appDispatcher.dispatchViewAction({
        type: likeConstants.DELETE_LIKE,
        body: {
          like: like
        }
      });
    });
  }
};
