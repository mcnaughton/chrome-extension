"use strict";

require('./homePageStyle.less');

var Header = require('./Header');
var React = require('react');
var ReadMeHTML = require('../../README.md');
var StaticHTMLBlock = require('../StaticHTMLBlock');

var HomePage = React.createClass({displayName: "HomePage",
  render() {
    return (
      React.createElement("div", {className: "homePage"}, 
        React.createElement(Header, null), 

        React.createElement("div", {className: "pageBody", id: "body"}, 
          React.createElement("div", {className: "contents"}, 
            React.createElement(StaticHTMLBlock, {html: ReadMeHTML})
          )
        )
      )
    );
  }
});

module.exports = HomePage;
