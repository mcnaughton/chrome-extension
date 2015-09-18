"use strict";

require('./base.less');

var Constants = require('./Constants');
var HomePage = require('./home/HomePage');
var TableAPIPage = require('./docs/TableAPIPage');
var ColumnAPIPage = require('./docs/ColumnAPIPage');
var ColumnGroupAPIPage = require('./docs/ColumnGroupAPIPage');
var ExamplesPage = require('./examples/ExamplesPage');
var React = require('react');

var faviconURL = require('./images/favicon.png');

var APIPages = Constants.APIPages;
var ExamplePages = Constants.ExamplePages;
var OtherPages = Constants.OtherPages;
var Pages = Constants.Pages;

var IndexPage = React.createClass({displayName: "IndexPage",
  statics: {
    getDoctype() {
      return '<!doctype html>';
    },

    renderToString(props) {
      return IndexPage.getDoctype() +
        React.renderToString(React.createElement(IndexPage, React.__spread({},  props)));
    },
  },

  getInitialState() {
    return {
      renderPage: !this.props.devMode
    };
  },

  render() {
    // Dump out our current props to a global object via a script tag so
    // when initialising the browser environment we can bootstrap from the
    // same props as what each page was rendered with.
    var browserInitScriptObj = {
      __html: 'window.INITIAL_PROPS = ' + JSON.stringify(this.props) + ';\n'
    };

    return (
      React.createElement("html", null, 
        React.createElement("head", null, 
          React.createElement("meta", {charSet: "utf-8"}), 
          React.createElement("title", null, "FixedDataTable"), 
          React.createElement("meta", {name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0"}), 
          React.createElement("link", {rel: "stylesheet", href: "//code.cdn.mozilla.net/fonts/fira.css"}), 
          React.createElement("link", {rel: "stylesheet", type: "text/css", href: this.props.files['main.css']}), 
          React.createElement("link", {rel: "shortcut icon", type: "image/png", href: faviconURL}), 
          React.createElement("base", {target: "_blank"})
        ), 
        React.createElement("body", null, 
          this.state.renderPage && this._renderPage(), 

          React.createElement("script", {dangerouslySetInnerHTML: browserInitScriptObj}), 
          React.createElement("script", {src: "https://cdn.rawgit.com/zynga/scroller/master/src/Animate.js"}), 
          React.createElement("script", {src: "https://cdn.rawgit.com/zynga/scroller/master/src/Scroller.js"}), 
          React.createElement("script", {src: this.props.files['main.js']})
        )
      )
    );
  },

  _renderPage() {
    switch (this.props.location) {
      case OtherPages.HOME.location:
        return React.createElement(HomePage, null);
      case APIPages.TABLE_API.location:
        return React.createElement(TableAPIPage, null);
      case APIPages.COLUMN_API.location:
        return React.createElement(ColumnAPIPage, null);
      case APIPages.COLUMNGROUP_API.location:
        return React.createElement(ColumnGroupAPIPage, null);
    }

    for (var key in ExamplePages) {
      if (ExamplePages.hasOwnProperty(key) &&
        ExamplePages[key].location === this.props.location) {
        return React.createElement(ExamplesPage, {example: ExamplePages[key]});
      }
    }

    throw new Error(
      'Page of location ' +
        JSON.stringify(this.props.location) +
        ' not found.'
    );
  },

  componentDidMount() {
    if (!this.state.renderPage) {
      this.setState({
        renderPage: true
      });
    }
  }
});

module.exports = IndexPage;
