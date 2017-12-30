import {
  isVisible,
  clickable
} from 'ember-cli-page-object';

export default {
  msg: {
    scope: '[data-test-id="app-notice"]',
    isVisible: isVisible()
  },
  close: {
    scope: '[data-test-id="app-notice-dismiss"]',
    isVisible: isVisible(),
    click: clickable(),
  }
};
