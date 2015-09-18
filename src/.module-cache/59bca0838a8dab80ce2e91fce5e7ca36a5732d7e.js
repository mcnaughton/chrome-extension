"use strict";

var ExampleImage = require('./ExampleImage');
var FakeObjectDataListStore = require('./FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');

var Column = FixedDataTable.Column;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function renderDate(/*object*/ cellData) {
  return React.createElement("span", null, cellData.toLocaleString());
}

var SortExample = React.createClass({displayName: "SortExample",
  getInitialState() {
    return {
      rows: new FakeObjectDataListStore().getAll(),
      sortBy: 'year',
      sortDir: null,
    };
  },
  
  _rowGetter(rowIndex) {
    return this.state.rows[rowIndex];
  },
  
  _sortRowsBy(cellDataKey) {
    var sortDir = this.state.sortDir;
    var sortBy = cellDataKey;
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
    } else {
      sortDir = SortTypes.DESC;
    }
    
    var rows = this.state.rows.slice();
    rows.sort((a, b) => {
      var sortVal = 0;
      if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
      }
      if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
      }
      
      if (sortDir === SortTypes.DESC) {
        sortVal = sortVal * -1;
      }
      
      return sortVal;
    });
    
    this.setState({
      rows,
      sortBy,
      sortDir,
    });
  },

  _renderHeader(label, cellDataKey) {
    return (
      React.createElement("a", {onClick: this._sortRowsBy.bind(null, cellDataKey)}, label)
    );
  },
  
  render() {
    var sortDirArrow = '';
    
    if (this.state.sortDir !== null){
      sortDirArrow = this.state.sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
    }
                      
    return (
      React.createElement(Table, {
        rowHeight: 50, 
        rowGetter: this._rowGetter, 
        rowsCount: this.state.rows.length, 
        width: this.props.tableWidth, 
        height: this.props.tableHeight, 
        headerHeight: 50}, 
        React.createElement(Column, {
          headerRenderer: this._renderHeader, 
          label: 'id' + (this.state.sortBy === 'id' ? sortDirArrow : ''), 
          width: 100, 
          dataKey: "id"}
        ), 
        React.createElement(Column, {
          headerRenderer: this._renderHeader, 
          label: 'First Name' + (this.state.sortBy === 'firstName' ? sortDirArrow : ''), 
          width: 200, 
          dataKey: "firstName"}
        ), 
        React.createElement(Column, {
          headerRenderer: this._renderHeader, 
          label: 'Last Name' + (this.state.sortBy === 'lastName' ? sortDirArrow : ''), 
          width: 200, 
          dataKey: "lastName"}
        ), 
        React.createElement(Column, {
          headerRenderer: this._renderHeader, 
          label: 'City' + (this.state.sortBy === 'city' ? sortDirArrow : ''), 
          width: 200, 
          dataKey: "city"}
        ), 
         React.createElement(Column, {
          headerRenderer: this._renderHeader, 
          label: 'Company' + (this.state.sortBy === 'companyName' ? sortDirArrow : ''), 
          width: 200, 
          dataKey: "companyName"}
        )
        
      )
    );
  },
  
});

module.exports = SortExample;
