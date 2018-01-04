import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['drag-zone'],

  dragState: service(),

  dragLeave() {
    get(this, 'dragState').leaving();
  },

  dragOver() {
    get(this, 'dragState').dragging();
  }
});
