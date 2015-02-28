var likes = {
  0: {
    id: 0,
    messageId: 0
  },
  1: {
    id: 1,
    messageId: 0
  },
  2: {
    id: 2,
    messageId: 0
  },
  3: {
    id: 3,
    messageId: 3
  },
  4: {
    id: 4,
    messageId: 5
  },
  5: {
    id: 5,
    messageId: 5
  },
};

var nextId = 6;

LikeFetcher = {
  name: 'like',
  create: function(req, resource, params, body, config, callback) {
    setTimeout(function () {
      var like = {
        id: nextId,
        messageId: params.like.messageId
      };
      likes[nextId] = like;
      nextId++;
      callback(null, like);
    }, 100);
  },
  read: function(req, resource, params, config, callback) {
    setTimeout(function () {
      var messageIds = params.messageIds;
      var likesInMessages = Object.keys(likes).reduce(function (likesInMessages, likeId) {
        var like = likes[likeId];
        if (messageIds.indexOf(like.messageId.toString()) > -1) {
          likesInMessages[likeId] = like;
        }
        return likesInMessages;
      }, {});
      callback(null, likesInMessages);
    }, 100);
  },
  delete: function(req, resource, params, config, callback) {
    setTimeout(function () {
      var likeToDelete = params.like;
      var like;
      for (var id in likes) {
        like = likes[id];
        if (likeToDelete.messageId.toString() === like.messageId.toString()) {
          delete likes[id];
          break;
        }
      }
      callback(null, like);
    }, 100);
  }
};

module.exports = LikeFetcher;
