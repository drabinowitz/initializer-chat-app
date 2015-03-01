var React = require('react');
var StateMixin = require('react-router').State;

//request for message data based on the roomId param
var requestLike = function () {
  //since we will request likes based on our messages we don't need to pass in params
  likeActions.read();
};

//generate an initializer mixin with the request callback
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
      //store current route in state so we can check for route changes
      currentRoomId: this.getParams().roomId,
      likes: likeStore.getAllForMessageId(this.props.messageId)
    };
  },

  listenerCallback: function () {
    this.setState(this.getInitialState());
  },

  componentDidMount: function () {
    likeStore.addChangeListener(this.listenerCallback);
    //use setTimeout in order to reorder requests so we requestMessage before requestLike
    //this could also be accoplished by queuing promises on componentWillMount and then executing the requests on componentDidMount
    setTimeout(function () {
      requestLike();
    }.bind(this), 0);
  },

  componentWillReceiveProps: function () {
    //generate new request whenever our routes change
    if (this.getParams().roomId !== this.state.currentRoomId) {
      requestLike();
    }
  },

  componentWillUnmount: function () {
    likeStore.removeChangeListener(this.listenerCallback);
  },

  handleLike: function (e) {
    e.preventDefault();
    e.stopPropagation();
    //if the message has been liked then unlike it, otherwise like it
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
