"use strict";

var React = require('react');

var StaticHTMLBlock = React.createClass({displayName: "StaticHTMLBlock",
  propTypes: {
    html: React.PropTypes.string.isRequired
  },

  shouldComponentUpdate() {
    return false;
  },

  render() {
    var {html, ...props} = this.props;
    return (
      React.createElement("div", React.__spread({
        dangerouslySetInnerHTML: {__html: html}}, 
        props)
      )
    );
  },
});

module.exports = StaticHTMLBlock;
