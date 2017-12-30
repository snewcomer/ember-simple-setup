import Component from '@ember/component';
import { classNames } from 'ember-decorators/component';
import { action } from 'ember-decorators/object';

@classNames('forgot-password-form')
export default class ForgotPasswordComponent extends Component {
  /**
   * called when hitting enter or clicking button
   * applies underlying changes to data model 
   * 
   * @method validate
   * @param {Object} changeset 
   */
  @action
  validate(changeset) {
    changeset.validate();
    if (changeset.get('isValid')) {
      changeset.execute();
    }
  }
}
