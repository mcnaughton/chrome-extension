"use strict";

var React = require('react');
var Constants = require('./Constants');

var SideBar = React.createClass({displayName: "SideBar",
  render() {
    return (
      React.createElement("div", {className: "sideBar"}, 
        React.createElement("div", {className: "scrollContent"}, 
          React.createElement("h4", {className: "groupTitle"}, this.props.title), 
          Object.keys(this.props.pages).map(
              page => this.renderLink(
                this.props.pages[page].title,
                this.props.pages[page].location
              )
            )
        )
      )
    );
  },

  renderLink(linkName, linkUrl) {
    var arrow = React.createElement("span", {className: "arrowBullet"});
    var linkClass = 'sideItem';
    if (this.props.example.location === linkUrl) {
      linkClass += ' curSideItem';
    }

    return (
      React.createElement("h2", {key: linkName}, 
        React.createElement("a", {href: linkUrl, target: "_self", className: linkClass}, 
          React.createElement("span", {className: "sidebarItemText"}, linkName), 
          arrow
        )
      )
    );
  }
});

module.exports = SideBar;
