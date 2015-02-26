var React = require('react');

var Html = React.createClass({
  render: function () {
    /*jshint ignore:start*/
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
      </body>
      <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
      <script src="/public/bundle.js" defer></script>
    </html>
    /*jshint ignore:end*/
  }
});

module.exports = Html;
