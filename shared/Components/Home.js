var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Isomorphic Chat App Built With React Router Initializer</h1>
        <br />
        <Link to='home'>Home</Link>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
