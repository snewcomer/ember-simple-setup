import Mirage from 'ember-cli-mirage';

export default function () {

  this.post('https://api.cloudinary.com/**', () => {
    return new Mirage.Response(201, {}, {
      public_id: 'abc123'
    });
  });
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  /**
  * Users
  */
  this.get('/users');

  this.post('/users', function (schema) {
    let { password, username } = this.normalizedRequestAttrs();
    let user = schema.create('user', { password, username });
    return user;
  });

  this.get('/users/:id');

  // PATCH /users/:id
  this.patch('/users/:id', function (schema) {
    let attrs = this.normalizedRequestAttrs();
    let userId = attrs.id;
    let user = schema.users.find(userId);

    return user.update(attrs);
  });

  /**
* Token
*/

  // POST /token/refresh
  this.post('/token/refresh', (/* schema, request */) => {
    return {
      // // token encoded at https://jwt.io/
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcm5hbWUiOiJvd25lckBjb2RlY29ycHMub3JnIiwidXNlcl9pZCI6MSwiZXhwIjo3MjAwMDAwMH0.LxkkKMcQoccAA0pphgRfXPSLdyaCawlK1gB3yPCht2s',
      user_id: '1'
    };
  });

  // POST /token
  this.post('/token', (schema, request) => {
    let json = JSON.parse(request.requestBody);

    let { models } = schema.users.where({ username: json.username, password: json.password });

    if (models.length > 0) {
      return {
        // token encoded at https://jwt.io/
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcm5hbWUiOiJvd25lckBjb2RlY29ycHMub3JnIiwidXNlcl9pZCI6MSwiZXhwIjo3MjAwMDAwMH0.LxkkKMcQoccAA0pphgRfXPSLdyaCawlK1gB3yPCht2s',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcm5hbWUiOiJvd25lckBjb2RlY29ycHMub3JnIiwidXNlcl9pZCI6MSwiZXhwIjo3MjAwMDAwMH0.LxkkKMcQoccAA0pphgRfXPSLdyaCawlK1gB3yPCht2s',
        user_id: models[0].id
      };
    } else {
      let errorDetail = `Your password doesn't match the email ${json.username}.`;
      return new Mirage.Response(401, {}, {
        errors: [
          {
            id: 'UNAUTHORIZED',
            title: '401 Unauthorized',
            detail: errorDetail,
            status: 401
          }
        ]
      });
    }
  });

  /**
  * Password
  */
  this.post('/password/forgot', () => {

    // just return something?
    return new Mirage.Response(201, {}, {
      username: 'test'
    });
  });

  this.post('/password/reset', function (schema) {
    let { password, 'password-confirmation': passwordConfirmation, token } = this.normalizedRequestAttrs();

    let [matchedUser] = schema.users.where({ token }).models;

    if (password === passwordConfirmation) {
      return new Mirage.Response(201, {}, {
        username: matchedUser.username,
        token,
        user_id: matchedUser.id
      });
    } else {
      return new Mirage.Response(422, {}, {
        errors: [
          {
            detail: 'Password confirmation passwords do not match',
            source: {
              pointer: '/data/attributes/password-confirmation'
            },
            status: '422',
            title: 'passwords do not match'
          }
        ],
        jsonapi: {
          version: '1.0'
        }
      });
    }
  });

}
