'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactTestUtils = require('react/lib/ReactTestUtils');

var _ReactTestUtils2 = _interopRequireDefault(_ReactTestUtils);

var _themeable = require('../themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _themeComponent = require('../themeComponent');

var _themeComponent2 = _interopRequireDefault(_themeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright 2015, Andrey Popp <8mayday@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/* global describe, it */

function shallowRender(element, context) {
  var renderer = _ReactTestUtils2.default.createRenderer();
  renderer.render(element, context);
  return renderer.getRenderOutput();
}

describe('themeComponent', function () {
  it('works as factory', function () {
    var themeOverride = { className: 'className' };

    var Component = function (_React$Component) {
      _inherits(Component, _React$Component);

      function Component() {
        _classCallCheck(this, Component);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Component).apply(this, arguments));
      }

      _createClass(Component, [{
        key: 'render',
        value: function render() {
          var theme = this.theme;
          return _react2.default.createElement('div', { className: theme.className });
        }
      }]);

      return Component;
    }(_react2.default.Component);

    var ThemeableComponent = (0, _themeable2.default)(Component);
    var ThemedComponent = (0, _themeComponent2.default)(ThemeableComponent, themeOverride);

    var themedElem = shallowRender(_react2.default.createElement(ThemedComponent, null));
    (0, _expect2.default)(themedElem.props.className).toBe('className');
  });

  it('still allow theme override via props', function () {
    var themeOverride = { className: 'className' };

    var Component = function (_React$Component2) {
      _inherits(Component, _React$Component2);

      function Component() {
        _classCallCheck(this, Component);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Component).apply(this, arguments));
      }

      _createClass(Component, [{
        key: 'render',
        value: function render() {
          var theme = this.theme;
          return _react2.default.createElement('div', { className: theme.className });
        }
      }]);

      return Component;
    }(_react2.default.Component);

    var ThemeableComponent = (0, _themeable2.default)(Component);
    var ThemedComponent = (0, _themeComponent2.default)(ThemeableComponent, themeOverride);

    var themedElem = shallowRender(_react2.default.createElement(ThemedComponent, { theme: { className: 'overriden!' } }));
    (0, _expect2.default)(themedElem.props.className).toBe('overriden!');
  });

  it('merges with the previous theme', function () {
    var Component = function (_React$Component3) {
      _inherits(Component, _React$Component3);

      function Component() {
        _classCallCheck(this, Component);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Component).apply(this, arguments));
      }

      _createClass(Component, [{
        key: 'render',
        value: function render() {
          var theme = this.theme;
          return _react2.default.createElement('div', { className: theme.className });
        }
      }]);

      return Component;
    }(_react2.default.Component);

    Component.defaultTheme = { className: 'className' };

    var ThemeableComponent = (0, _themeable2.default)(Component);
    var ThemedComponent = (0, _themeComponent2.default)(ThemeableComponent, {});

    var themedElem = shallowRender(_react2.default.createElement(ThemedComponent, null));
    (0, _expect2.default)(themedElem.props.className).toBe('className');
  });
});
