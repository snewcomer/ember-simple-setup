import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  setupController(controller, error) {
    Ember.Logger.debug(error);
    controller.set('model', error);
  },
});
