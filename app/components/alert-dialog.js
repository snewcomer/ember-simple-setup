import Component from '@ember/component';
import { classNames } from 'ember-decorators/component';

/**
  AlertDialog
  A common way to display an alert dialog to a user (similar to javscript native alert)

  # Usage
  {{#alert-dialog as |content|}}
    {{#content.title}}
      <h2>My Title</h2>
    {{/content.title}}

    {{#content.body}}
      Just add some body text: {{t "my text"}}
    {{/content.body}}

    {{#content.footer}}
      Add some content to the footer (typically a button). <button>Cancel</button>
    {{/content.footer}}

    ## It can also render a button in the footer, if you decide to provide some button params
    {{content.footer button=(hash class="foo" text="foo" action=(action (mut foo)))}}
  {{/alert-dialog}}

  @extends Ember.Component
*/

@classNames('alert-dialog', 't-alert-dialog')
export default class AlertDialog extends Component {
}
