'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContextTypes = undefined;
exports.makeThemeContext = makeThemeContext;
exports.getThemeContext = getThemeContext;

var _react = require('react');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CONTEXTKEY = '@@themeable';

var ThemeContextTypes = exports.ThemeContextTypes = _defineProperty({}, CONTEXTKEY, _react.PropTypes.object);

function makeThemeContext(theme) {
  return _defineProperty({}, CONTEXTKEY, theme);
}

function getThemeContext(context) {
  return context ? context[CONTEXTKEY] : undefined;
}
