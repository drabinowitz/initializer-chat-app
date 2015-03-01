require('node-jsx').install({extension: '.js'});

var React = require('react');
var Router = require('react-router');
var initializer = require('react-router-initializer');

var express = require('express');

var server = express();

var bodyParser = require('body-parser');
var Fetcher = require('fetchr/libs/fetcher');

//register all fetchers
Fetcher.registerFetcher(require('./services/likes'));
Fetcher.registerFetcher(require('./services/messages'));
Fetcher.registerFetcher(require('./services/rooms'));

var App = require('../shared/App');
var Routes = require('../shared/Components/Routes');
var Html = React.createFactory(require('../shared/Components/Html'));

server.use(bodyParser.json());
server.use('/public', express.static(__dirname + '/../client'));

//use Fetcher middleware for api routes
server.use(App.xhrPath, Fetcher.middleware());

server.use(function (req, res) {
  //create a new fetcher instance when we receive a request
  var fetcher = new Fetcher({
    xhrPath: App.xhrPath,
    requireCrumb: false
  });

  //promisify our fetcher and store it in our App so our actions can use it
  App.fetcher = require('bluebird').promisifyAll(fetcher);

  //run our router
  Router.run(Routes, req.url, function (Handler, RouteState) {

    //execute our initializer to register our promises
    initializer.execute(RouteState).then(function () {
      //when promises resolve render our app
      var markup = React.renderToString(React.createElement(Handler, null));

      //dehydrate our stores to send them up to the client
      var state = [require('../shared/Stores/roomStore'), require('../shared/Stores/messageStore'), require('../shared/Stores/likeStore')].reduce(function (state, store) {
        var dehydratedStoreState = store.dehydrate();
        state += 'window.state["' + dehydratedStoreState[0] + '"]=' + JSON.stringify(dehydratedStoreState[1]) + ';';
        return state;
      }, 'window.state={};');

      //send the response using our Html component factory
      res.send(React.renderToStaticMarkup(Html({
        markup: markup,
        state: state
      })));
    });
  });
});

module.exports = server;
