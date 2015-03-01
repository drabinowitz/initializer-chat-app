var React = require('react');
var Router = require('react-router');
var Fetcher = require('fetchr/libs/fetcher.client');

var App = require('../shared/App');

//generate a new instance of the fetcher
var fetcher = new Fetcher({
  xhrPath: App.xhrPath,
  requireCrumb: false
});

//promisify the fetcher and store it in the app so our actions can access it
App.fetcher = require('bluebird').promisifyAll(fetcher);

//rehydrate all stores
[require('../shared/Stores/roomStore'), require('../shared/Stores/messageStore'), require('../shared/Stores/likeStore')].forEach(function (store) {
  store.rehydrate(window.state);
});

var Routes = require('../shared/Components/Routes');

//run routes
Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, window.document.getElementById('app'));
});
