import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  admin: attr(),
  username: attr(),
  password: attr(),
  email: attr(),
  insertedAt: attr('date'),
  updatedAt: attr('date'),
  photoLargeUrl: attr(),
  photoThumbUrl: attr(),
});
