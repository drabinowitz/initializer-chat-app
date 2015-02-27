var React = require('react');
var StateMixin = require('react-router').State;

var requestLike = function (params) {
  likeActions.read(params.roomId);
};

var initializerMixin = require('react-router-initializer').generateMixin(requestLike);

var likeActions = require('../Actions/likeActions');
var likeStore = require('../Stores/likeStore');

var LikesOwner = React.createClass({
  mixins:[initializerMixin, StateMixin],

  propTypes: {
    messageId: React.PropTypes.number.isRequired
  },

  getInitialState: function () {
    return {
      likes: likesStore.getAllForMessage(this.props.messageId)
    };
  },

  listenerCallback: function () {
    this.setState(this.getInitialState());
  },

  componentDidMount: function () {
    likeStore.addChangeListener(this.listenerCallback);
    requestLike(this.getParams());
  },

  componentWillUnmount: function () {
    likeStore.removeChangeListener(this.listenerCallback);
  },

  render: function () {
    return (
      <div>
        <p>Likes: {this.state.likes}</p>
      </div>
    );
  }
});

module.exports = LikesOwner;
