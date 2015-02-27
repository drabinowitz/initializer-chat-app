var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var requestRoom = function () {
  roomActions.get();
};

var InitializerMixin = require('react-router-initializer').generateMixin(requestRoom);

var roomActions = require('../Actions/roomActions');
var roomStore = require('../Stores/roomStore');
var Room = require('./Room');
var StateMixin = require('react-router').State;

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
