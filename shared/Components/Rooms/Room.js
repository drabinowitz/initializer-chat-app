var React = require('react');
var Link = require('react-router').Link;
var ReusableForm = require('../ReusableForm');

var Room = React.createClass({
  propTypes: {
    room: React.PropTypes.object.isRequired,
    handleUpdate: React.PropTypes.func.isRequired,
    handleDelete: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      editing: false
    };
  },

  showEdit: function () {
    this.setState({
      editing: true
    });
  },

  onUpdate: function (newTitle) {
    this.setState({
      editing: false
    });

    var newRoom = {
      id: this.props.room.id,
      title: newTitle
    };

    this.props.handleUpdate(this.props.room, newRoom);
  },

  onDelete: function () {
    this.props.handleDelete(this.props.room);
  },

  render: function () {
    var toShow;
    if (this.state.editing) {
      toShow = (
        <ReusableForm handleSubmit={this.onUpdate} defaultValue={this.props.room.title} />
      );
    } else {
      toShow = (
        <Link to='messages' params={{roomId: this.props.room.id}}>{this.props.room.title}</Link>
      );
    }

    return (
      <div>
        {toShow}
        <button onClick={this.showEdit}>Edit</button>
        <button onClick={this.onDelete}>Delete</button>
      </div>
    );
  }
});

module.exports = Room;
