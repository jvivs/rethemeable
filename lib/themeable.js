'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * @copyright 2015, Andrey Popp <8mayday@gmail.com>
                                                                                                                                                                                                                                                   */
/* eslint react/require-render-return: "off" */ // Can remove once issue is resolved: https://github.com/yannickcr/eslint-plugin-react/issues/552

exports.default = themeable;
exports.isThemeable = isThemeable;

var _react = require('react');

var _ThemeContextTypes = require('./ThemeContextTypes');

var _themeComponent = require('./themeComponent');

var _themeComponent2 = _interopRequireDefault(_themeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Mark component as themeable.
 *
 * Themeable components has `theme` attribute which can be confired explicitly
 * via props or passed via context.
 *
 * Also themeable components have `theme` class attribute which is used to
 * distinguish component styles.
 */
function themeable(Component) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var defaultTheme = _ref.defaultTheme;
  var themeKey = _ref.themeKey;

  var displayName = Component.displayName || Component.name;
  var themeableKey = (typeof themeKey === 'undefined' ? 'undefined' : _typeof(themeKey)) === 'symbol' ? themeKey : Symbol(displayName);

  var ThemeableComponent = function (_Component) {
    _inherits(ThemeableComponent, _Component);

    function ThemeableComponent(props) {
      _classCallCheck(this, ThemeableComponent);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ThemeableComponent).call(this, props));

      _this.themeCache = null;
      return _this;
    }

    _createClass(ThemeableComponent, [{
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.theme !== this.props.theme || (0, _ThemeContextTypes.getThemeContext)(nextContext) !== (0, _ThemeContextTypes.getThemeContext)(this.context)) {
          this.themeCache = null;
        }
        if (_get(Object.getPrototypeOf(ThemeableComponent.prototype), 'componentWillUpdate', this)) {
          _get(Object.getPrototypeOf(ThemeableComponent.prototype), 'componentWillUpdate', this).call(this, nextProps, nextState, nextContext);
        }
      }
    }, {
      key: 'theme',
      get: function get() {
        if (this.themeCache !== null) {
          return this.themeCache;
        }

        var theme = this.props.theme;

        if (!theme) {
          theme = this.constructor.concreteTheme;
        }
        if (!theme) {
          var themeUniverse = (0, _ThemeContextTypes.getThemeContext)(this.context);
          theme = themeUniverse && themeUniverse[themeableKey];
        }
        if (defaultTheme) {
          theme = _extends({}, defaultTheme, theme);
        } else if (Component.defaultTheme) {
          theme = _extends({}, Component.defaultTheme, theme);
        }
        if (!theme) {
          theme = {};
        }
        this.themeCache = theme;
        return theme;
      }
    }]);

    return ThemeableComponent;
  }(Component);

  ThemeableComponent.displayName = displayName;
  ThemeableComponent.propTypes = _extends({}, Component.propTypes, {
    theme: _react.PropTypes.object
  });
  ThemeableComponent.contextTypes = _extends({}, Component.contextTypes, _ThemeContextTypes.ThemeContextTypes);
  ThemeableComponent.theme = themeableKey;
  ThemeableComponent.concreteTheme = null;
  ThemeableComponent.isThemeable = true;


  if (ThemeableComponent.style === undefined) {
    ThemeableComponent.style = function style(theme) {
      return (0, _themeComponent2.default)(this, theme);
    };
  }

  return ThemeableComponent;
}

function isThemeable(Component) {
  return Component.isThemeable;
}
