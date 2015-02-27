var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var StateMixin = Router.State;

var requestRoom = function () {
  roomActions.read();
};

var InitializerMixin = require('react-router-initializer').generateMixin(requestRoom);

var roomActions = require('../Actions/roomActions');
var roomStore = require('../Stores/roomStore');
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

  render: function () {
    var roomList = this.state.rooms.map(function (room) {
      return <Room key={room.id} room={room} />
    });
    return (
      <div>
        {roomList}
        <RouteHandler />
      </div>
    );
  }
});

module.exports = RoomsOwner;
