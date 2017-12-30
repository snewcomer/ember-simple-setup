import Component from '@ember/component';
import { tagName, classNames } from 'ember-decorators/component';

/**
  `site-footer` composes the bottom footer navigation

  ## default usage

  ```handlebars
  {{site-footer}}
  ```

  @class SiteFooter
  @module Component
  @extends Ember.Component
 */
@tagName('footer')
@classNames('site-footer')
export default class SiteFooter extends Component {
}