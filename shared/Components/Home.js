var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({
  getInitialState: function () {
    return {
      fullyLoaded: false
    };
  },
  componentDidMount: function () {
    this.setState({
      fullyLoaded: true
    });
  },
  render: function () {
    return (
      <div>
        <h1>Isomorphic Chat App Built With React Router Initializer</h1>
        <br />
        <h2>{this.state.fullyLoaded ? 'the app has loaded' : 'server side rendering'}</h2>
        <br />
        <Link to='home'>Home</Link>
        <Link to='rooms'>View Rooms</Link>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
