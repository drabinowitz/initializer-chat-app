var React = require('react');
var StateMixin = require('react-router').State;

var requestLike = function (params) {
  likeActions.read(params.roomId);
};

var initializerMixin = require('react-router-initializer').generateMixin(requestLike);

var likeActions = require('../../Actions/likeActions');
var likeStore = require('../../Stores/likeStore');

var LikesOwner = React.createClass({
  mixins:[initializerMixin, StateMixin],

  propTypes: {
    messageId: React.PropTypes.number.isRequired
  },

  getInitialState: function () {
    return {
      hasLiked: this.state ? this.state.hasLiked : false,
      currentRoomId: this.getParams().roomId,
      likes: likeStore.getAllForMessageId(this.props.messageId)
    };
  },

  listenerCallback: function () {
    this.setState(this.getInitialState());
  },

  componentDidMount: function () {
    likeStore.addChangeListener(this.listenerCallback);
    setTimeout(function () {
      requestLike(this.getParams());
    }.bind(this), 0);
  },

  componentWillReceiveProps: function () {
    if (this.getParams().roomId !== this.state.currentRoomId) {
      requestLike(this.getParams());
    }
  },

  componentWillUnmount: function () {
    likeStore.removeChangeListener(this.listenerCallback);
  },

  handleLike: function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.hasLiked) {
      this.setState({
        hasLiked: true
      });
      likeActions.create({
        messageId: this.props.messageId
      });
    } else {
      this.setState({
        hasLiked: false
      });
      likeActions.delete({
        messageId: this.props.messageId
      });
    }
  },

  render: function () {
    return (
      <div>
        <p>Likes: {this.state.likes}</p>
        <button onClick={this.handleLike}>{this.state.hasLiked ? 'Unlike': 'Like'}</button>
      </div>
    );
  }
});

module.exports = LikesOwner;
