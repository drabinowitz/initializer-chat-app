var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var StateMixin = Router.State;

var requestRoom = function () {
  roomActions.read();
};

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

  componentWillReceiveProps: function () {
    requestRoom();
  },

  componentWillUnmount: function () {
    roomStore.removeChangeListener(this.listenerCallback);
  },

  createRoom: function (room) {
    roomActions.create(room);
  },

  updateRoom: function (room, newRoom) {
    roomActions.update(room, newRoom);
  },

  deleteRoom: function (room) {
    roomActions.delete(room);
  },

  render: function () {
    var roomList = Object.keys(this.state.rooms).sort(function (a,b) {return a-b;}).map(function (roomId) {
      var room = this.state.rooms[roomId];
      return <Room key={room.id} room={room} handleUpdate={this.updateRoom} handleDelete={this.deleteRoom} />
    }.bind(this));
    return (
      <div>
        <ReusableForm handleSubmit={this.createRoom}>Add New Room</ReusableForm>
        {roomList}
        <RouteHandler />
      </div>
    );
  }
});

module.exports = RoomsOwner;
