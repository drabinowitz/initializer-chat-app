var React = require('react');

var Html = React.createClass({
  //app Html we only use this for server side rendering
  //submit markup inside of app
  //submit state to script tag
  render: function () {
    return (
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
    );
  }
});

module.exports = Html;
