import {
  fillable,
  clickable,
  attribute
} from 'ember-cli-page-object';

export default {
  email: {
    scope: '#email',
    fill: fillable()
  },
  username: {
    scope: '#username',
    fill: fillable()
  },
  submit: {
    scope: 'button[type=submit]',
    click: clickable(),
    isDisabled: attribute('disabled') 
  }
};
