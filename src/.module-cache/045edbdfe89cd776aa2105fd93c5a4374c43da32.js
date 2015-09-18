/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";

var ROWS = 1000000;

var ExampleImage = require('./ExampleImage');
var FakeObjectDataListStore = require('./FakeObjectDataListStore');

var FixedDataTable = require('fixed-data-table');
var React = require('react');

var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

function renderImage(/*string*/ cellData) {
  return React.createElement(ExampleImage, {src: cellData});
}

function renderLink(/*string*/ cellData) {
  return React.createElement("a", {href: "#"}, cellData);
}

function renderDate(/*object*/ cellData) {
  return React.createElement("span", null, cellData.toLocaleString());
}

var ObjectDataExample = React.createClass({displayName: "ObjectDataExample",

  propTypes: {
    onContentDimensionsChange: PropTypes.func,
    left: PropTypes.number,
    top: PropTypes.number,
  },

  _onContentHeightChange(contentHeight) {
    this.props.onContentDimensionsChange &&
      this.props.onContentDimensionsChange(contentHeight, 1150);
  },

  getInitialState() {
    return {
      dataList: new FakeObjectDataListStore(ROWS)
    }
  },

  _rowGetter(index){
    return this.state.dataList.getObjectAt(index);
  },

  render() {
    var controlledScrolling =
      this.props.left !== undefined || this.props.top !== undefined;

    return (
      React.createElement(Table, {
        rowHeight: 50, 
        headerHeight: 50, 
        rowGetter: this._rowGetter, 
        rowsCount: this.state.dataList.getSize(), 
        width: this.props.tableWidth, 
        height: this.props.tableHeight, 
        onContentHeightChange: this._onContentHeightChange, 
        scrollTop: this.props.top, 
        scrollLeft: this.props.left, 
        overflowX: controlledScrolling ? "hidden" : "auto", 
        overflowY: controlledScrolling ? "hidden" : "auto"}, 
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
        ), 
        React.createElement(Column, {
          cellRenderer: renderLink, 
          label: "Email", 
          width: 200, 
          dataKey: "email"}
        ), 
        React.createElement(Column, {
          cellRenderer: renderDate, 
          label: "DOB", 
          width: 200, 
          dataKey: "date"}
        )
      )
    );
  },
});

module.exports = ObjectDataExample;
