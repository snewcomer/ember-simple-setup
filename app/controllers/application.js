import EmberAppNoticeController from 'ember-app-notice/controllers/ember-app-notice';
import { service } from 'ember-decorators/service';

export default class ApplicationController extends EmberAppNoticeController {
  @service session
}