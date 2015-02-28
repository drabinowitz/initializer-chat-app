var Store = require('./Store');

var appDispatcher = require('../Dispatcher/appDispatcher');
var likeConstants = require('../Constants/likeConstants');

var likeStore = new Store('like');

likeStore.getAllForMessageId = function (messageId) {
  return Object.keys(this._data).reduce(function (sum, likeId) {
    if (this._data[likeId].messageId === messageId) {
      sum++;
    }

    return sum;
  }.bind(this), 0);
};

likeStore.deleteForMessageId = function (like) {
  for (var id in this._data) {
    if (like.messageId.toString() === this._data[id].messageId.toString()) {
      this.delete(this._data[id]);
      break;
    }
  }
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

module.exports = likeStore;
