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

var ExampleHeader = require('./ExampleHeader');
var ExamplesWrapper = require('./ExamplesWrapper');
var TouchExampleWrapper = require('./TouchExampleWrapper');
var React = require('react');
var Constants = require('../Constants');

var ExamplePages = Constants.ExamplePages;

var ExamplesPage = React.createClass({displayName: "ExamplesPage",
  getInitialState() {
    return {
      renderPage: false
    };
  },

  render() {
    return (
      React.createElement(ExamplesWrapper, React.__spread({},  this.props), 
        React.createElement(ExampleHeader, React.__spread({},  this.props)), 
        this.state.renderPage && this._renderPage()
      )
    );
  },

  _renderPage() {
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

    switch (this.props.example) {
      case ExamplePages.OBJECT_DATA_EXAMPLE:
        var ObjectDataExample = require('./ObjectDataExample');
        return (
          React.createElement(TouchExampleWrapper, React.__spread({},  this.state), 
            React.createElement(ObjectDataExample, null)
          )
        );
      case ExamplePages.RESIZE_EXAMPLE:
        var ResizeExample = require('./ResizeExample');
        return (
          React.createElement(TouchExampleWrapper, React.__spread({},  this.state), 
            React.createElement(ResizeExample, null)
          )
        );
      case ExamplePages.FLEXGROW_EXAMPLE:
        var FlexGrowExample = require('./FlexGrowExample');
        return (
          React.createElement(TouchExampleWrapper, React.__spread({},  this.state), 
            React.createElement(FlexGrowExample, null)
          )
        );
      case ExamplePages.COLUMN_GROUPS_EXAMPLE:
        var ColumnGroupsExample = require('./ColumnGroupsExample');
        return (
          React.createElement(TouchExampleWrapper, React.__spread({},  this.state), 
            React.createElement(ColumnGroupsExample, null)
          )
        );
      case ExamplePages.FILTER_EXAMPLE:
        var FilterExample = require('./FilterExample');
        return (
          React.createElement(TouchExampleWrapper, React.__spread({},  this.state), 
            React.createElement(FilterExample, null)
          )
        );
      case ExamplePages.SORT_EXAMPLE:
        var SortExample = require('./SortExample');
        return (
          React.createElement(TouchExampleWrapper, React.__spread({},  this.state), 
            React.createElement(SortExample, null)
          )
        );
    }
  },

  componentDidMount() {
    this._update();
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', this._onResize, false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', this._onResize);
    } else {
      win.onresize = this._onResize;
    }
  },

  _onResize() {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._update, 16);
  },

  _update() {
    var win = window;

    var widthOffset = win.innerWidth < 680 ? 0 : 240;

    this.setState({
      renderPage: true,
      tableWidth: win.innerWidth - widthOffset,
      tableHeight: win.innerHeight - 200,
    });
  }
});

module.exports = ExamplesPage;
