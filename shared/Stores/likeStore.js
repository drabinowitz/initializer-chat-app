var Store = require('./Store');

var appDispatcher = require('../Dispatcher/appDispatcher');
var likeConstants = require('../Constants/likeConstants');

//new instance of Store
var likeStore = new Store('like');

likeStore.getAllForMessageId = function (messageId) {
  //Object.keys(this._data) returns an array of like ids
  //reduce the array to a sum
  return Object.keys(this._data).reduce(function (sum, likeId) {
    //if the messageId of each like matches the passed in messageId increment our sum
    if (this._data[likeId].messageId === messageId) {
      sum++;
    }
    return sum;
  }.bind(this), 0);
};

likeStore.deleteForMessageId = function (like) {
  //find the first messageId that matches our passed in like.messageId and delete it
  for (var id in this._data) {
    if (like.messageId.toString() === this._data[id].messageId.toString()) {
      this.delete(this._data[id]);
      break;
    }
  }
};

//register with the dispatcher
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
