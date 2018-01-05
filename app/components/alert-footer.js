import Component from '@ember/component';
import { classNames } from 'ember-decorators/component';

/**
  AdFooter
  @extends Ember.Component
*/
@classNames('modal-footer', 't-modal-footer')
export default class AdFooter extends Component {
  /**
    A hash of params to be attached to an html button
    e.g., button=(hash class="some-class" text="Go" action=(action "myAction"))

    @property button
    @type {Object}
    @public
  */
  button = null;
}
