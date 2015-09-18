"use strict";

var ExampleImage = require('./ExampleImage');
var FakeObjectDataListStore = require('./FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');

var Column = FixedDataTable.Column;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;

function renderImage(/*string*/ cellData) {
  return React.createElement(ExampleImage, {src: cellData});
}

var FilterExample = React.createClass({displayName: "FilterExample",
  getInitialState() {
    return {
      rows : new FakeObjectDataListStore().getAll(),
      filteredRows: null,
      filterBy: null
    };
  },

  componentWillMount() {
    this._filterRowsBy(this.state.filterBy);
  },

  _filterRowsBy(filterBy) {

    var rows = this.state.rows.slice();        
    var filteredRows = filterBy ? rows.filter(function(row){
      return row['firstName'].toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
    }) : rows;

    this.setState({
      filteredRows,
      filterBy,
    })
  },

  _rowGetter(rowIndex) {
    return this.state.filteredRows[rowIndex];
  },

  _onFilterChange(e) {
    this._filterRowsBy(e.target.value);
  },
  
	render() {
		return (
      React.createElement("div", null, 
        React.createElement("input", {onChange: this._onFilterChange, placeholder: "Filter by First Name"}), 
        React.createElement("br", null), 
        React.createElement(Table, {
          rowHeight: 50, 
          rowGetter: this._rowGetter, 
          rowsCount: this.state.filteredRows.length, 
          width: this.props.tableWidth, 
          height: this.props.tableHeight, 
          scrollTop: this.props.top, 
          scrollLeft: this.props.left, 
          headerHeight: 50}, 
          React.createElement(Column, {
            cellRenderer: renderImage, 
            dataKey: "avartar", 
            fixed: true, 
            label: "", 
            width: 50}
          ), 
          React.createElement(Column, {
            dataKey: "firstName", 
            fixed: true, 
            label: "First Name", 
            width: 100}
          ), 
          React.createElement(Column, {
            dataKey: "lastName", 
            fixed: true, 
            label: "Last Name", 
            width: 100}
          ), 
          React.createElement(Column, {
            dataKey: "city", 
            label: "City", 
            width: 100}
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
          )
        )
      )
    )
	},
})

module.exports = FilterExample;