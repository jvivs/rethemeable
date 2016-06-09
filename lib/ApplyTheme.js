'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ThemeContextTypes = require('./ThemeContextTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright 2015, Andrey Popp <8mayday@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Inject theme into a component tree.
 */

var ApplyTheme = function (_React$Component) {
  _inherits(ApplyTheme, _React$Component);

  function ApplyTheme() {
    _classCallCheck(this, ApplyTheme);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ApplyTheme).apply(this, arguments));
  }

  _createClass(ApplyTheme, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var theme = this.props.theme;

      var prevTheme = (0, _ThemeContextTypes.getThemeContext)(this.context);

      if (prevTheme) {
        theme = _extends({}, prevTheme, theme);
      }

      return (0, _ThemeContextTypes.makeThemeContext)(theme);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return ApplyTheme;
}(_react2.default.Component);

ApplyTheme.propTypes = {
  children: _react.PropTypes.object,
  theme: _react.PropTypes.object
};
ApplyTheme.childContextTypes = _ThemeContextTypes.ThemeContextTypes;
ApplyTheme.contextTypes = _ThemeContextTypes.ThemeContextTypes;
exports.default = ApplyTheme;
