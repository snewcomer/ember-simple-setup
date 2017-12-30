import {
  create
} from 'ember-cli-page-object';
import forgotPasswordForm from './components/password/forgot-password';
import resetPasswordForm from './components/password/reset-password';

export default create({
  forgotPasswordForm,
  resetPasswordForm
});