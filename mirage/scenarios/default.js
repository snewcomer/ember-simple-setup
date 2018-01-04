export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  server.create('user', {
    admin: true,
    email: 'owner@gmail.org',
    password: 'password',
    username: 'owner'
  });
}
