var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var StateMixin = Router.State;

//request for room data
var requestRoom = function () {
  roomActions.read();
};

//generate an initializer mixin with the request callback
var InitializerMixin = require('react-router-initializer').generateMixin(requestRoom);

var roomActions = require('../../Actions/roomActions');
var roomStore = require('../../Stores/roomStore');
var ReusableForm = require('../ReusableForm');
var Room = require('./Room');

var RoomsOwner = React.createClass({
  mixins: [StateMixin, InitializerMixin],

  getInitialState: function () {
    return {
      rooms: roomStore.getAll()
    };
  },

  listenerCallback: function () {
    this.setState(this.getInitialState());
  },

  componentDidMount: function () {
    roomStore.addChangeListener(this.listenerCallback);
    requestRoom();
  },

  componentWillUnmount: function () {
    roomStore.removeChangeListener(this.listenerCallback);
  },

  createRoom: function (title) {
    var room = {
      title: title
    };
    roomActions.create(room);
  },

  updateRoom: function (room, newRoom) {
    roomActions.update(room, newRoom);
  },

  deleteRoom: function (room) {
    roomActions.delete(room);
  },

  render: function () {
    //Object.keys(this.state.rooms) returns an array of our room ids
    //sort that array by ids so it has a consistent length
    //map the sorted array of ids to Room components
    var roomList = Object.keys(this.state.rooms).sort(function (a,b) {return a-b;}).map(function (roomId) {
      //get room corresponding to each id
      var room = this.state.rooms[roomId];
      return (
        <Room key={room.id} room={room} handleUpdate={this.updateRoom} handleDelete={this.deleteRoom} />
      );
    }.bind(this));

    return (
      <div>
        <ReusableForm handleSubmit={this.createRoom} placeholder='Add New Room' />
        {roomList}
        <RouteHandler />
      </div>
    );
  }
});

module.exports = RoomsOwner;
