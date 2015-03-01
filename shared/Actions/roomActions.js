var appDispatcher = require('../Dispatcher/appDispatcher');
var roomConstants = require('../Constants/roomConstants');
var App = require('../App');
var initializer = require('react-router-initializer');

module.exports = {
  create: function (room) {
    //promise to create room from App fetcher
    App.fetcher.createAsync('room', {room: room}, {}, {}).then(function (room) {
      //dispatch room when the promise resolves
      appDispatcher.dispatchViewAction({
        type: roomConstants.CREATE_ROOM,
        body: {
          room: room
        }
      });
    });
  },
  read: function () {
    //promise to read rooms from App fetcher
    var fetchRoom = App.fetcher.readAsync('room', {}, {}).then(function (rooms) {
      //dispatch rooms when the promise resolves
      appDispatcher.dispatchViewAction({
        type: roomConstants.READ_ROOM,
        body: {
          rooms: rooms
        }
      });
      //return rooms so that the promise can properly be chained
      return rooms;
    });
    //store the promise so we can use it later if we need
    this.fetchRoom = fetchRoom;
    //register the promise with initializer
    initializer.register(fetchRoom);
  },
  update: function (room, newRoom) {
    //promise to update the old room with the new room from App fetcher
    App.fetcher.updateAsync('room', {room: room, newRoom: newRoom}, {}, {}).then(function (newRoom) {
      //dispatch the old and new rooms when the promise resolves
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
    //promise to delete the room from App fetcher
    App.fetcher.deleteAsync('room', {room: room}, {}).then(function (room) {
      //dispatch the room when the promise resolves
      appDispatcher.dispatchViewAction({
        type: roomConstants.DELETE_ROOM,
        body: {
          room: room
        }
      });
    });
  }
};
