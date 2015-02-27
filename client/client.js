var React = require('react');
var Router = require('react-router');
var Fetcher = require('fetchr/libs/fetcher.client');

var App = require('../shared/App');

var fetcher = new Fetcher({
  xhrPath: App.xhrPath,
  requireCrumb: false
});

App.fetcher = require('bluebird').promisifyAll(fetcher);

[require('../shared/Stores/roomStore'), require('../shared/Stores/messageStore'), require('../shared/Stores/likeStore')].forEach(function (store) {
  store.rehydrate(window.state);
});

var Routes = require('../shared/Components/Routes');

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, window.document.getElementById('app'));
});
