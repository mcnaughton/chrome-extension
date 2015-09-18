"use strict";

var React = require('react');
var IndexPage = require('./IndexPage');

React.render(
  React.createElement(IndexPage, React.__spread({}, 
    window.INITIAL_PROPS)
  ),
  document
);
