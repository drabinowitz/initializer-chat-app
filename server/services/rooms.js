//rooms hash
var rooms = {
  0: {
    id: 0,
    title: 'Lobby'
  },
  1: {
    id: 1,
    title: 'React Room'
  }
};

//track id for creating new room
var nextId = 2;

RoomFetcher = {
  name: 'room',
  create: function(req, resource, params, body, config, callback) {
    //create new room after timeout and pass to callback
    setTimeout(function () {
      var room = {
        id: nextId,
        title: params.room.title
      };
      rooms[nextId] = room;
      nextId++;
      callback(null, room);
    }, 100);
  },
  read: function(req, resource, params, config, callback) {
    //read in likes after timeout and pass to callback
    setTimeout(function () {
      callback(null, rooms);
    }, 100);
  },
  update: function(req, resource, params, body, config, callback) {
    //add id from old room to new room and replace old room with new room in rooms after timeout and pass to callback
    setTimeout(function () {
      var id = +params.room.id;
      var newRoom = params.newRoom;
      newRoom.id = id;
      rooms[id] = newRoom;
      callback(null, newRoom);
    }, 100);
  },
  delete: function(req, resource, params, config, callback) {
    //delete room after timeout and pass to callback
    setTimeout(function () {
      var room = params.room;
      delete rooms[room.id];
      callback(null, room);
    }, 100);
  }
};

module.exports = RoomFetcher;
