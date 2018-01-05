import {
  isVisible,
  isHidden,
  hasClass,
  clickable
} from 'ember-cli-page-object';

export default {
  modal: {
    testContainer: '#ember-testing',
    largeDesktopClass: hasClass('dialog-container--large', 'div.ember-modal-dialog'),
    smallDesktopClass: hasClass('dialog-container--small', 'div.ember-modal-dialog'),
    fullScreenClass: hasClass('full-screen', 'animation-wrapper'),
    overlay: {
      scope: '.ember-modal-overlay',
      isVisible: isVisible(),
      isHidden: isHidden(),
      click: clickable()
    },
  }
};
