"use strict";

var Constants = require('../Constants');
var DocsHTMLWrapper = require('./DocsHTMLWrapper');
var TableAPIHTML = require('../../docs/ColumnGroupAPI.md');
var React = require('react');

var ColumnGroupAPIPage = React.createClass({displayName: "ColumnGroupAPIPage",
  render() {
    return (
      React.createElement(DocsHTMLWrapper, {
        html: TableAPIHTML, 
        example: Constants.APIPages.COLUMNGROUP_API}
      )
    );
  }
});

module.exports = ColumnGroupAPIPage;
