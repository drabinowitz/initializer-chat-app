require('node-jsx').install({extension: '.js'});

var React = require('react');
var Router = require('react-router');
var initializer = require('react-router-initializer');

var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var Fetcher = require('fetchr/lib/fetcher');

Fetcher.registerFetcher(require('./services/likes'));
Fetcher.registerFetcher(require('./services/messages'));
Fetcher.registerFetcher(require('./services/rooms'));

var App = require('../shared/App');
var Routes = require('../shared/Components/Routes');
var Html = React.createFactory(require('../shared/Components/Html'));

app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/../client'));
app.use(App.xhrPath, Fetcher.getMiddleware());

app.use(function (req, res) {
  var fetcher = new Fetcher({
    xhrPath: App.xhrPath,
    requireCrumb: false
  });

  App.fetcher = require('bluebird').promisifyAll(fetcher);

  Router.run(Routes, req.url, function (Handler, RouteState) {
    initializer.execute(RouteState).then(function () {
      res.send(React.renderToStaticMarkup(Html({
        markup: React.createElement(Handler, null),
        state: [require('../shared/Stores/roomStore'), require('../shared/Stores/messageStore'), require('../shared/Stores/likeStore')].reduce(function (state, store) {
          var dehydratedStoreState = store.dehydrate();
          state += 'window.state["' + dehydratedStoreState[0] + '"]=' + JSON.stringify(dehydratedStoreState[1]) + ';';
          return state;
        }, 'window.state={};')
      })));
    });
  });
});

module.exports = app;
