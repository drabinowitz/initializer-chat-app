var appDispatcher = require('../Dispatcher/appDispatcher');
var likeConstants = require('../Constants/likeConstants');
var App = require('../App');
var initializer = require('react-router-initializer');
var messageActions = require('./messageActions');

module.exports = {
  create: function (like) {
    //promise request to create like from App fetcher
    App.fetcher.createAsync('like', {like: like}, {}, {}).then(function (like) {
      //dispatch the new like when the create promise resolves
      appDispatcher.dispatchViewAction({
        type: likeConstants.CREATE_LIKE,
        body: {
          like: like
        }
      });
    });
  },
  read: function () {
    //wait for our message promise to resolve
    var fetchLike = messageActions.fetchMessage
      .then(function (messages) {
        var messageIds = Object.keys(messages);
        //submit message ids to read promise for likes from App fetcher
        return App.fetcher.readAsync('like', {messageIds: messageIds}, {});
      })
      .then(function (likes) {
        //dispatch likes when the read promise resolves
        appDispatcher.dispatchViewAction({
          type: likeConstants.READ_LIKE,
          body: {
            likes: likes
          }
        });
        //return likes in case future promises need them
        return likes;
      });

    //store promise in case we need it
    this.fetchLike = fetchLike;
    //register promise with initializer
    initializer.register(fetchLike);
  },
  delete: function (like) {
    //promise to delete like from App fetcher
    App.fetcher.deleteAsync('like', {like: like}, {}).then(function (like) {
      //dispatch like when the delete promise resolves
      appDispatcher.dispatchViewAction({
        type: likeConstants.DELETE_LIKE,
        body: {
          like: like
        }
      });
    });
  }
};
