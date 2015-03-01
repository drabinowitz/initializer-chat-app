var Store = require('./Store');

var appDispatcher = require('../Dispatcher/appDispatcher');
var messageConstants = require('../Constants/messageConstants');

//new instance of Store
var messageStore = new Store('message');

messageStore.getAllForRoomId = function (roomId) {
  //return an object containing each message within our passed in roomId
  var result = {};
  for (var id in this._data) {
    var message = this._data[id];
    if (message.roomId.toString() === roomId.toString()) {
      result[id] = message;
    }
  }
  return result;
};

//register with the dispatcher
appDispatcher.register(function (payload) {
  var type = payload.action.type;
  var body = payload.action.body;
  switch (type) {
    case messageConstants.CREATE_MESSAGE:
      messageStore.create(body.message);
      break;

    case messageConstants.READ_MESSAGE:
      messageStore.read(body.messages);
      break;

    case messageConstants.UPDATE_MESSAGE:
      messageStore.update(body.message, body.newMessage);
      break;

    case messageConstants.DELETE_MESSAGE:
      messageStore.delete(body.message);
      break;
  }
});

module.exports = messageStore;
