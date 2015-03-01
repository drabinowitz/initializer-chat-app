var Store = require('./Store');

var appDispatcher = require('../Dispatcher/appDispatcher');
var roomConstants = require('../Constants/roomConstants');

//new instance of Store
var roomStore = new Store('room');

//register with the dispatcher
appDispatcher.register(function (payload) {
  var type = payload.action.type;
  var body = payload.action.body;
  switch (type) {
    case roomConstants.CREATE_ROOM:
      roomStore.create(body.room);
      break;

    case roomConstants.READ_ROOM:
      roomStore.read(body.rooms);
      break;

    case roomConstants.UPDATE_ROOM:
      roomStore.update(body.room, body.newRoom);
      break;

    case roomConstants.DELETE_ROOM:
      roomStore.delete(body.room);
      break;
  }
});

module.exports = roomStore;
