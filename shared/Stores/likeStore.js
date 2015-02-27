var Store = require('./Store');

var appDispatcher = require('../Dispatcher/appDispatcher');
var likeConstants = require('../Constants/likeConstants');

var likeStore = new Store('like');

likeStore.getAllForMessage = function (messageId) {
  return Object.keys(this._data).reduce(function (sum, likeId) {
    if (this._data[likeId].messageId === messageId) {
      sum++;
    }

    return sum;
  }.bind(this), 0);
};

LikeStore.deleteForMessageId = function (like) {
  for (var id in this._data) {
    if (like.messageId === this._data[id].messageId.toString()) {
      delete likes[id];
      break;
    }
  }
  this.emitChange();
};

appDispatcher.register(function (payload) {
  var type = payload.action.type;
  var body = payload.action.body;
  switch (type) {
    case likeConstants.CREATE_LIKE:
      likeStore.create(body.like);
      break;

    case likeConstants.READ_LIKE:
      likeStore.read(body.likes);
      break;

    case likeConstants.DELETE_LIKE:
      likeStore.deleteForMessageId(body.like);
      break;
  }
});

module.exports = roomStore;
