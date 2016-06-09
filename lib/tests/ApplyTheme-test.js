'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactTestUtils = require('react/lib/ReactTestUtils');

var _ReactTestUtils2 = _interopRequireDefault(_ReactTestUtils);

var _ThemeContextTypes = require('../ThemeContextTypes');

var _ApplyTheme = require('../ApplyTheme');

var _ApplyTheme2 = _interopRequireDefault(_ApplyTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shallowRender(element, context) {
  var renderer = _ReactTestUtils2.default.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
} /**
   * @copyright 2015, Andrey Popp <8mayday@gmail.com>
   */
/* global describe, it */

describe('<ApplyTheme />', function () {
  it('injects theme via context', function () {
    var Component = function Component(props, context) {
      var theme = (0, _ThemeContextTypes.getThemeContext)(context);
      return _react2.default.createElement('div', { className: theme.className });
    };
    Component.contextTypes = _ThemeContextTypes.ThemeContextTypes;

    var theme = { className: 'className' };
    var context = new _ApplyTheme2.default({ theme: theme }).getChildContext();
    var themedElem = shallowRender(_react2.default.createElement(
      _ApplyTheme2.default,
      { theme: theme },
      _react2.default.createElement(Component, null)
    ));
    themedElem = shallowRender(themedElem, context);
    (0, _expect2.default)(themedElem.props.className).toBe('className');
  });

  it('preserves theme passed via outer components', function () {
    var Component = function Component(props, context) {
      var theme = (0, _ThemeContextTypes.getThemeContext)(context);
      return _react2.default.createElement('div', {
        className1: theme.className1,
        className2: theme.className2
      });
    };
    Component.contextTypes = _ThemeContextTypes.ThemeContextTypes;

    var theme1 = { className1: 'className1' };
    var theme2 = { className2: 'className2' };
    var themed1 = new _ApplyTheme2.default({ theme: theme1 });
    var context0 = {};
    themed1.context = context0;
    var themed2 = new _ApplyTheme2.default({ theme: theme2 });
    var context1 = themed1.getChildContext();
    themed2.context = context1;
    var context2 = themed2.getChildContext();

    var themedElem = void 0;
    themedElem = shallowRender(_react2.default.createElement(
      _ApplyTheme2.default,
      { theme: theme1 },
      _react2.default.createElement(
        _ApplyTheme2.default,
        { theme: theme2 },
        _react2.default.createElement(Component, null)
      )
    ));
    themedElem = shallowRender(themedElem, context1);
    themedElem = shallowRender(themedElem, context2);

    (0, _expect2.default)(themedElem.props.className1).toBe('className1');
    (0, _expect2.default)(themedElem.props.className2).toBe('className2');
  });
});
