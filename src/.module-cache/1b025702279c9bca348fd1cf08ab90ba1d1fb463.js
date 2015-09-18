"use strict";

var FakeObjectDataListStore = require('../examples/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');
var Constants = require('../Constants');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

// Require common FixedDataTable CSS.
require('fixed-data-table/css/layout/ScrollbarLayout.css');
require('fixed-data-table/css/layout/fixedDataTableLayout.css');
require('fixed-data-table/css/layout/fixedDataTableCellLayout.css');
require('fixed-data-table/css/layout/fixedDataTableCellGroupLayout.css');
require('fixed-data-table/css/layout/fixedDataTableColumnResizerLineLayout.css');
require('fixed-data-table/css/layout/fixedDataTableRowLayout.css');

require('fixed-data-table/css/style/fixedDataTable.css');
require('fixed-data-table/css/style/fixedDataTableCell.css');
require('fixed-data-table/css/style/fixedDataTableColumnResizerLine.css');
require('fixed-data-table/css/style/fixedDataTableRow.css');
require('fixed-data-table/css/style/Scrollbar.css');


var HeroTable = React.createClass({displayName: "HeroTable",

  getInitialState() {
    return {
      dataList: new FakeObjectDataListStore()
    }
  },

  _rowGetter(index) {
    return this.state.dataList.getObjectAt(index);
  },

  render() {
    return (
      React.createElement(Table, {
        scrollLeft: this.props.scrollLeft, 
        scrollTop: this.props.scrollTop, 
        overflowX: "hidden", 
        overflowY: "hidden", 
        rowHeight: 50, 
        headerHeight: 50, 
        rowGetter: this._rowGetter, 
        rowsCount: this.state.dataList.getSize(), 
        width: this.props.tableWidth, 
        height: this.props.tableHeight}, 
        React.createElement(Column, {
          flexGrow: 1, 
          dataKey: "firstName", 
          fixed: true, 
          label: "First Name", 
          width: 150}
        ), 
        React.createElement(Column, {
          flexGrow: 1, 
          dataKey: "lastName", 
          fixed: true, 
          label: "Last Name", 
          width: 120}
        ), 
        React.createElement(Column, {
          flexGrow: 1, 
          dataKey: "city", 
          label: "City", 
          width: 200}
        ), 
        React.createElement(Column, {
          label: "Street", 
          width: 200, 
          dataKey: "street"}
        ), 
        React.createElement(Column, {
          label: "Zip Code", 
          width: 200, 
          dataKey: "zipCode"}
        ), 
        React.createElement(Column, {
          label: "Email", 
          width: 200, 
          dataKey: "email"}
        ), 
        React.createElement(Column, {
          label: "DOB", 
          width: 400, 
          dataKey: "date"}
        ), 
        React.createElement(Column, {
          flexGrow: 1, 
          dataKey: "city", 
          label: "City", 
          width: 400}
        ), 
        React.createElement(Column, {
          dataKey: "bs", 
          label: "BS!", 
          width: 300}
        ), 
        React.createElement(Column, {
          dataKey: "catchPhrase", 
          label: "Catch Phrase", 
          width: 400}
        ), 
        React.createElement(Column, {
          dataKey: "companyName", 
          label: "Company Name", 
          width: 700}
        )
      )
    );
  }
});

module.exports = HeroTable;
