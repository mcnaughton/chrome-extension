"use strict";

require('./docsPageStyle.less');

var MiniHeader = require('../MiniHeader');
var SideBar = require('../SideBar');
var React = require('react');
var StaticHTMLBlock = require('../StaticHTMLBlock');
var Constants = require('../Constants');

var DocsHTMLWrapper = React.createClass({displayName: "DocsHTMLWrapper",
  render() {
    return (
      React.createElement("div", {className: "docsPage"}, 
        React.createElement(MiniHeader, null), 

        React.createElement("div", {className: "pageBody", id: "body"}, 
          React.createElement("div", {className: "contents"}, 
            React.createElement(SideBar, {
              title: "API", 
              pages: Constants.APIPages, 
              example: this.props.example}
            ), 
            React.createElement(StaticHTMLBlock, {
              className: "docContents", 
              html: this.props.html}
            )
          )
        )
      )
    );
  }
});

module.exports = DocsHTMLWrapper;
