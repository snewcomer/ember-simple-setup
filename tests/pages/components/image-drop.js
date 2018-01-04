import {
  findElement,
  hasClass,
  triggerable
} from 'ember-cli-page-object';

import fillInFileInput from 'ember-simple-setup/tests/helpers/fill-in-file-input';
import removeDoubleQuotes from 'ember-simple-setup/tests/helpers/remove-double-quotes';

export default {
  dragZone: {
    dragleave: triggerable('dragleave', '.drag-zone'),
    dragover: triggerable('dragover', '.drag-zone')
  },
  dropZone: {
    scope: '.image-drop',

    backgroundImageData() {
      let $el = findElement(this);
      let backgroundImageData = $el.css('background-image');
      return removeDoubleQuotes(backgroundImageData);
    },

    backgroundImageUrl() {
      let url = this.backgroundImageData();
      return url.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    },

    dropFile(content) {
      fillInFileInput(`${this.scope} input[type=file]`, { name: 'file.png', content });
    },

    isActive: hasClass('image-drop--active'),
    isCircle: hasClass('image-drop--circle'),
    isDragging: hasClass('image-drop--drag')
  }
};
