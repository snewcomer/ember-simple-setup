import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { get } from '@ember/object';
import { alias } from 'ember-decorators/object/computed';
import { task } from 'ember-concurrency';
import { classNames } from 'ember-decorators/component';

@classNames('form-wrapper')
export default class UserDetail extends Component {
  @service appNotice


  @alias('model.hasDirtyAttributes') isDirty

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

  save = task(function * (model) {
    if (get(this, 'isDirty')) {
      try {
        yield model.save();
      } catch(e) {
        const appNotice = get(this, 'appNotice');
        appNotice.handleNotification({message: 'oops', level: 'error'});
      }
    }
  })
}
