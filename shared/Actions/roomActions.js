var appDispatcher = require('../Dispatcher/appDispatcher');
var roomConstants = require('../Constants/roomConstants');
var App = require('../App');
var initializer = require('react-router-initializer');

module.exports = {
  create: function (room) {
    App.fetcher.createAsync('room', {room: room}).then(function (room) {
      appDispatcher.dispatchViewAction({
        type: roomConstants.CREATE_ROOM,
        body: {
          room: room
        }
      });
    });
  },
  read: function () {
    var fetchRoom = App.fetcher.readAsync('room').then(function (rooms) {
      appDispatcher.dispatchViewAction({
        type: roomConstants.READ_ROOM,
        body: {
          rooms: rooms
        }
      });
      return rooms;
    });

    this.fetchRoom = fetchRoom;
    initializer.register(fetchRoom);
  },
  update: function (room) {
    App.fetcher.updateAsync('room', {room: room, newRoom: newRoom}).then(function (newRoom) {
      appDispatcher.dispatchViewAction({
        type: roomConstants.UPDATE_ROOM,
        body: {
          room: room,
          newRoom: newRoom
        }
      });
    });
  },
  delete: function (room) {
    App.fetcher.deleteAsync('room', {room: room}).then(function (room) {
      appDispatcher.dispatchViewAction({
        type: roomConstants.DELETE_ROOM,
        body: {
          room: room
        }
      });
    });
  }
};
