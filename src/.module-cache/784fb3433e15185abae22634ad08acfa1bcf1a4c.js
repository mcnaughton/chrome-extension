"use strict";

var React = require('react');
var Constants = require('./Constants');

require('./miniHeader.less');

var GITHUB_URL = 'https://github.com/facebook/fixed-data-table';
var DOCS_DEFAULT_LOCATION = Constants.DOCS_DEFAULT.location;
var EXAMPLES_DEFAULT_LOCATION = Constants.EXAMPLES_DEFAULT.location;

var MiniHeader = React.createClass({displayName: "MiniHeader",
  render() {
    return (
      React.createElement("div", {className: "header"}, 
        React.createElement("div", {className: "miniHeader"}, 
          React.createElement("div", {className: "miniHeaderContents"}, 
            React.createElement("a", {href: "./", target: "_self", className: "miniLogo"}), 
            React.createElement("a", {className: "homeLink", href: "./", target: "_self"}, 
              "Home"
            ), 
            React.createElement("a", {href: DOCS_DEFAULT_LOCATION, target: "_self"}, "Docs"), 
            React.createElement("a", {href: EXAMPLES_DEFAULT_LOCATION, target: "_self"}, "Examples"), 
            React.createElement("a", {href: GITHUB_URL}, "Github")
          )
        )
      )
    );
  }
});

module.exports = MiniHeader;
