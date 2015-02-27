var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Home = require('./Home');
var RoomsOwner = require('./Rooms/RoomsOwner');
var MessagesOwner = require('./Messages/MessagesOwner');

var Routes = (
  <Route name='home' path='/' handler={Home}>
    <Route name='rooms' path='/rooms' handler={RoomsOwner}>
      <Route name='messages' path='/rooms/:roomId' handler={MessagesOwner} />
    </Route>
  </Route>
);

module.exports = Routes;
