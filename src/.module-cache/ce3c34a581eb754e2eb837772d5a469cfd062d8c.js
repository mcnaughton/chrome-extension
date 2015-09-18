"use strict";

var React = require('react');
var Constants = require('../Constants');

var FIXED_THRESHOLD = 680;
var MAX_HEIGHT = 800;
var HEADER_HEIGHT = 50;
var EMPTY_OBJECT = {};
var GITHUB_URL = 'https://github.com/facebook/fixed-data-table';
var DOCS_DEFAULT_LOCATION = Constants.DOCS_DEFAULT.location;
var EXAMPLES_DEFAULT_LOCATION = Constants.EXAMPLES_DEFAULT.location;

var Header = React.createClass({displayName: "Header",
  getInitialState() {
    return {
      scroll: 0,
      fixed: false,
      renderHero: false,
    };
  },

  componentDidMount() {
    this.offsetWidth = this._getWindowWidth();
    this.offsetHeight = this.getDOMNode().offsetHeight;
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

    this.setState({
      renderHero: true,
      fixed: this.offsetWidth <= FIXED_THRESHOLD,
    });
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize(event) {
    this.offsetWidth = this._getWindowWidth();
    this.offsetHeight = this.getDOMNode().offsetHeight;
    this.setState({
      fixed: this.offsetWidth <= FIXED_THRESHOLD,
    });
    this.forceUpdate();
  },

  handleScroll(event) {
    var scrollPos = window.scrollY;
    scrollPos = scrollPos < this.offsetHeight ? scrollPos : this.offsetHeight;
    this.setState({ scroll: Math.max(scrollPos, 0) });
  },

  _getWindowWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },

  _renderHero() {
    var HeroTable = require('./HeroTable');

    return (
      React.createElement("div", {className: "heroContainer"}, 
        React.createElement(HeroTable, {
          scrollLeft: 0.5 * this.state.scroll, 
          scrollTop: 2 * MAX_HEIGHT - 2 * this.state.scroll, 
          tableWidth: this.offsetWidth, 
          tableHeight: this.offsetHeight}
        )
      )
    );
  },

  render() {
    var coverHeight  = this.offsetHeight - this.state.scroll;
    var topClip = coverHeight < 0 ? 0 : coverHeight;
    topClip = coverHeight > HEADER_HEIGHT ? HEADER_HEIGHT : coverHeight;

    var clipStyles = {
      clip: 'rect(' + topClip + 'px, 5000px, ' + HEADER_HEIGHT + 'px, 0)',
    };

    var miniHeaderClasses = 'miniHeader';
    if (!this.state.renderHero) {
      miniHeaderClasses += ' notLoaded';
    }

    return (
      React.createElement("div", {className: "header"}, 
        React.createElement("div", {
          className: miniHeaderClasses, 
          style: this.state.fixed ? EMPTY_OBJECT : clipStyles}, 
          React.createElement("div", {className: "miniHeaderContents"}, 
            React.createElement("a", {href: "./", target: "_self", className: "miniLogo"}), 
            React.createElement("a", {href: DOCS_DEFAULT_LOCATION, target: "_self"}, "Docs"), 
            React.createElement("a", {href: EXAMPLES_DEFAULT_LOCATION, target: "_self"}, "Examples"), 
            React.createElement("a", {href: GITHUB_URL}, "Github")
          )
        ), 
        React.createElement("div", {className: "cover"}, 
          this.state.renderHero && this._renderHero(), 
          React.createElement("div", {className: "logo"}, 
            React.createElement("div", {className: "title"}, 
              "FixedDataTable"
            ), 
            React.createElement("div", {className: "subtitle"}, 
              "A fast and flexible lazily rendered table for React.js"
            ), 
            React.createElement("a", {href: GITHUB_URL, className: "button"}, "View on GitHub"), 
            React.createElement("div", {className: "links"}, 
              React.createElement("a", {href: DOCS_DEFAULT_LOCATION, target: "_self"}, "Docs"), 
              "•", 
              React.createElement("a", {href: EXAMPLES_DEFAULT_LOCATION, target: "_self"}, "Examples")
            )
          )
        )
      )
    );
  },

});

module.exports = Header;
