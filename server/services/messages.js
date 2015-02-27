var messages = {
  0: {
    id: 0,
    roomId: 0,
    text: 'Welcome to the isomorphic react chat app'
  },
  1: {
    id: 1,
    roomId: 0,
    text: 'Built on React, Flux, Fetchr, React-Router, and the React-Router-Initializer'
  },
  2: {
    id: 2,
    roomId: 0,
    text: 'The power of the React-Router-Initializer is that it allows us to use the awesome React-Router'
  },
  3: {
    id: 3,
    roomId: 0,
    text: 'On both the client and the server without having to duplicate any code'
  },
  4: {
    id: 4,
    roomId: 0,
    text: 'And without our React-Router having to know anything about what data needs to be preloaded for a particular route'
  },
  5: {
    id: 5,
    roomId: 1,
    text: 'Have you heard about the awesome React-Router-Initializer? It makes building an isomorphic app like this one easy as pie.'
  },
};

var nextId = 6;

MessageFetcher = {
  name: 'message',
  create: function(req, resource, params, body, config, callback) {
    setTimeout(function () {
      var message = {
        id: nextId,
        roomId: params.message.roomId,
        text: params.message.text
      };
      messages[nextId] = message;
      nextId++;
      callback(null, message);
    }, 100);
  },
  read: function(req, resource, params, config, callback) {
    setTimeout(function () {
      var roomId = params.roomId;
      var messagesInRoom = Object.keys(messages).reduce(function (messagesInRoom, messageId) {
        var message = messages[messageId];
        if (message.roomId.toString() === roomId) {
          messagesInRoom[messageId] = message;
        }
        return messagesInRoom;
      }, {});
      callback(null, messagesInRoom);
    }, 100);
  },
  update: function(req, resource, params, body, config, callback) {
    setTimeout(function () {
      var id = +params.message.id;
      var newMessage = params.newMessage;
      newMessage.id = id;
      messages[id] = newMessage;
      callback(null, newMessage);
    }, 100);
  },
  delete: function(req, resource, params, config, callback) {
    setTimeout(function () {
      var message = params.message;
      delete messages[message.id];
      callback(null, message);
    }, 100);
  }
};

module.exports = MessageFetcher;
