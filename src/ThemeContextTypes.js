import {PropTypes} from 'react';

const CONTEXTKEY = '@@themeable';

export let ThemeContextTypes = {
  [CONTEXTKEY]: PropTypes.object
};

export function makeThemeContext(theme) {
  return {[CONTEXTKEY]: theme};
}

export function getThemeContext(context) {
  return context ? context[CONTEXTKEY] : undefined;
}
