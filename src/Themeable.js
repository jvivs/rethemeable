import {ThemeContextTypes, getThemeContext} from './ThemeContextTypes';

/**
 * Mark component as themeable.
 *
 * Themeable components has `theme` attribute which can be confired explicitly
 * via props or passed via context.
 *
 * Also themeable components have `theme` class attribute which is used to
 * distinguish component styles.
 */
export default function Themeable(Component) {
  let displayName = Component.displayName || Component.name;
  let themeKey = Symbol(displayName);

  return class extends Component {

    static displayName = displayName;

    static contextTypes = {
      ...Component.contextTypes,
      ...ThemeContextTypes
    };

    static theme = themeKey;

    constructor(props) {
      super(props);
      this._themeCache = null;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
      if (nextProps.theme !== this.props.theme ||
          getThemeContext(nextContext) !== getThemeContext(this.context)) {
        this._themeCache = null;
      }
    }

    get theme() {
      if (this._themeCache !== null) {
        return this._themeCache;
      }

      let {theme} = this.props;
      if (!theme) {
        let themeUniverse = getThemeContext(this.context);
        theme = themeUniverse && themeUniverse[themeKey];
      }
      if (this.constructor.defaultTheme) {
        theme = {...this.constructor.defaultTheme, ...theme};
      }
      if (!theme) {
        theme = {};
      }
      this._themeCache = theme;
      return theme;
    }
  };
}
