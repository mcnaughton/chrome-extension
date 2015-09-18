"use strict";

var Constants = require('../Constants');
var DocsHTMLWrapper = require('./DocsHTMLWrapper');
var TableAPIHTML = require('../../docs/ColumnAPI.md');
var React = require('react');

var ColumnAPIPage = React.createClass({displayName: "ColumnAPIPage",
  render() {
    return (
      React.createElement(DocsHTMLWrapper, {
        html: TableAPIHTML, 
        example: Constants.APIPages.COLUMN_API}
      )
    );
  }
});

module.exports = ColumnAPIPage;
