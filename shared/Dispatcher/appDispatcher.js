var assign = require('object-assign');

var Dispatcher = require('flux').Dispatcher;

var appDispatcher = new Dispatcher();

appDispatcher.dispatchViewAction = function (action) {
  this.dispatch({
    action: action,
    source: 'VIEW_ACTION'
  });
};

module.exports = appDispatcher;
