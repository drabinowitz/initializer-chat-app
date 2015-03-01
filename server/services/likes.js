//likes hash
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

//track id for creating new like
var nextId = 6;

LikeFetcher = {
  name: 'like',
  create: function(req, resource, params, body, config, callback) {
    //create new like after timeout and pass to callback
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
    //read in likes in list of message ids after timeout and pass to callback
    setTimeout(function () {
      var messageIds = params.messageIds;
      //Object.keys(likes) returns an array of like ids
      //reduce the array to a filtered object
      var likesInMessages = Object.keys(likes).reduce(function (likesInMessages, likeId) {
        var like = likes[likeId];
        //if the like.messageId is in the list of passed in messageIds then add to object
        if (messageIds.indexOf(like.messageId.toString()) > -1) {
          likesInMessages[likeId] = like;
        }
        return likesInMessages;
      }, {});
      callback(null, likesInMessages);
    }, 100);
  },
  delete: function(req, resource, params, config, callback) {
    //delete like after timeout and pass to callback
    setTimeout(function () {
      var likeToDelete = params.like;
      var like;
      for (var id in likes) {
        like = likes[id];
        //since the passed in like doesn't have an id we find the id to delete based on messageId
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
