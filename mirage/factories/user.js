import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  admin: true,
  email: faker.internet.email,
  username: faker.internet.domainWord,
  photoLargeUrl: faker.image.avatar,
  photoThumbUrl: faker.image.avatar,
});
