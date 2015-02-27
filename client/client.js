var React = require('react');
var Router = require('react-router');

var Routes = require('../shared/Components/Routes');

[require('../shared/Stores/roomStore'), require('../shared/Stores/messageStore'), require('../shared/Stores/likeStore')].forEach(function (store) {
  store.rehydrate(window.state);
});

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, window.document.getElementById('app'));
});
