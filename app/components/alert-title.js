import Component from '@ember/component';
import { classNames } from 'ember-decorators/component';

/**
  AdTitle
  @extends Ember.Component
*/

@classNames('modal-header', 'flex')
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
