var React = require('react');
var Link = require('react-router').Link;

var Room = React.createClass({
  propTypes: {
    room: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <Link to='messages' params={{roomId: this.props.room.id}}>{this.props.room.title}</Link>
    );
  }
});

module.exports = Room;
