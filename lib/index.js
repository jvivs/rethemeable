'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme = exports.themeable = exports.ApplyTheme = undefined;

var _ApplyTheme = require('./ApplyTheme');

var _ApplyTheme2 = _interopRequireDefault(_ApplyTheme);

var _themeable = require('./themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _themeComponent = require('./themeComponent');

var _themeComponent2 = _interopRequireDefault(_themeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ApplyTheme = _ApplyTheme2.default;
exports.themeable = _themeable2.default;
exports.theme = _themeComponent2.default; /**
                                           * @copyright 2015, Andrey Popp <8mayday@gmail.com>
                                           */

exports.default = {
  ApplyTheme: _ApplyTheme2.default,
  themeable: _themeable2.default,
  theme: _themeComponent2.default
};
