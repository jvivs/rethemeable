'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = themeComponent;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _themeable = require('./themeable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright 2015, Andrey Popp <8mayday@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/* eslint react/require-render-return: "off" */ // Can remove once issue is resolved: https://github.com/yannickcr/eslint-plugin-react/issues/552

/**
 * Apply theme to a component.
 *
 * Produce a new component which has theme applied by default.
 */
function themeComponent(Component, theme) {
  (0, _invariant2.default)((0, _themeable.isThemeable)(Component), 'Only themeable components can be themed');
  var displayName = Component.displayName || Component.name;

  var ThemedComponent = function (_Component) {
    _inherits(ThemedComponent, _Component);

    function ThemedComponent() {
      _classCallCheck(this, ThemedComponent);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ThemedComponent).apply(this, arguments));
    }

    return ThemedComponent;
  }(Component);

  ThemedComponent.displayName = displayName;
  ThemedComponent.concreteTheme = _extends({}, Component.defaultTheme, theme);

  return ThemedComponent;
}
