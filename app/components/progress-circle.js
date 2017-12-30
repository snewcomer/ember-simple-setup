import Component from '@ember/component';
import { select } from 'd3-selection';

export default Component.extend({
  didInsertElement() {
    const svg = select(this.$('svg')[0]);

    svg.append('rect')
      .attr('width', 20)
      .attr('height', 100);
  }
});
