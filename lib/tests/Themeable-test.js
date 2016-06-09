'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactTestUtils = require('react/lib/ReactTestUtils');

var _ReactTestUtils2 = _interopRequireDefault(_ReactTestUtils);

var _ThemeContextTypes = require('../ThemeContextTypes');

var _themeable = require('../themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

describe('themeable()', function () {
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
        return _react2.default.createElement('div', {
          className: theme.className,
          className2: theme.className2
        });
      }
    }]);

    return Component;
  }(_react2.default.Component);

  Component.defaultTheme = {
    className: 'defaultClassName',
    className2: 'defaultClassName2'
  };


  var ThemeableComponent = (0, _themeable2.default)(Component);

  it('allows configuration through context', function () {
    var theme = _defineProperty({}, ThemeableComponent.theme, {
      className: 'className'
    });
    var themedElem = shallowRender(_react2.default.createElement(ThemeableComponent, null), (0, _ThemeContextTypes.makeThemeContext)(theme));
    (0, _expect2.default)(themedElem.props.className).toBe('className');
    (0, _expect2.default)(themedElem.props.className2).toBe('defaultClassName2');
  });

  it('allows configuration through context with a passed themeKey', function () {
    var themeKey = Symbol('test-theme-key');
    var PassedThemeKeyComponent = (0, _themeable2.default)(Component, { themeKey: themeKey });
    var theme = _defineProperty({}, PassedThemeKeyComponent.theme, {
      className: 'className'
    });
    var themedElem = shallowRender(_react2.default.createElement(PassedThemeKeyComponent, null), (0, _ThemeContextTypes.makeThemeContext)(theme));
    (0, _expect2.default)(PassedThemeKeyComponent.theme).toBe(themeKey);
    (0, _expect2.default)(themedElem.props.className).toBe('className');
    (0, _expect2.default)(themedElem.props.className2).toBe('defaultClassName2');
  });

  it('allows configuration through props', function () {
    var buttonTheme = {
      className: 'className'
    };
    var themedElem = shallowRender(_react2.default.createElement(ThemeableComponent, { theme: buttonTheme }));
    (0, _expect2.default)(themedElem.props.className).toBe('className');
    (0, _expect2.default)(themedElem.props.className2).toBe('defaultClassName2');
  });

  it('falls back to default theme', function () {
    var themedElem = shallowRender(_react2.default.createElement(ThemeableComponent, null));
    (0, _expect2.default)(themedElem.props.className).toBe('defaultClassName');
    (0, _expect2.default)(themedElem.props.className2).toBe('defaultClassName2');
  });

  var PlainComponent = function (_React$Component2) {
    _inherits(PlainComponent, _React$Component2);

    function PlainComponent() {
      _classCallCheck(this, PlainComponent);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PlainComponent).apply(this, arguments));
    }

    _createClass(PlainComponent, [{
      key: 'render',
      value: function render() {
        var theme = this.theme;
        return _react2.default.createElement('div', {
          className: theme.className,
          className2: theme.className2
        });
      }
    }]);

    return PlainComponent;
  }(_react2.default.Component);

  var ThemeablePlainComponent = (0, _themeable2.default)(PlainComponent);

  it('can render without a theme', function () {
    var themedElem = shallowRender(_react2.default.createElement(ThemeablePlainComponent, null));
    (0, _expect2.default)(themedElem.props.className).toEqual(undefined);
    (0, _expect2.default)(themedElem.props.className2).toEqual(undefined);
  });
});
