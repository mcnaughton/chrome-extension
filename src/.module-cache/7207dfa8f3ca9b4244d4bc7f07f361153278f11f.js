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

require('./examplesPageStyle.less');

var MiniHeader = require('../MiniHeader');
var SideBar = require('../SideBar');
var React = require('react');
var Constants = require('../Constants');

var ExamplesWrapper = React.createClass({displayName: "ExamplesWrapper",
  render() {
    return (
      React.createElement("div", {className: "examplesPage"}, 
        React.createElement(MiniHeader, null), 

        React.createElement("div", {className: "pageBody", id: "body"}, 
          React.createElement("div", {className: "contents"}, 
            React.createElement(SideBar, {
              title: "Examples", 
              pages: Constants.ExamplePages, 
              example: this.props.example}
            ), 
            React.createElement("div", {className: "exampleContents"}, 
              this.props.children
            )
          )
        )
      )
    );
  }
});

module.exports = ExamplesWrapper;
