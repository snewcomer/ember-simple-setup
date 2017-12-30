import Component from '@ember/component';
import { tagName, classNames } from 'ember-decorators/component';
import { service } from 'ember-decorators/service';

/**
  `site-header` composes the top navigation-menu.

  ## default usage

  ```handlebars
  {{site-header}}
  ```

  @class SiteHeader
  @module Component
  @extends Ember.Component
 */
@classNames('site-header')
@tagName('header')
export default class SiteHeader extends Component {
  /**
    @property currentUser
    @type Ember.Service
  */
  @service currentUser

  /**
    @property session
    @type Ember.Service
  */
  @service session
}
