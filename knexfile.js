'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'dev',
      user:     'dev',
      password: 'shadow92%'
  },
    debug: true, // http://knexjs.org/#Installation-debug
    pool: { min: 1, max: 2 }
  },
  staging: {
    client: 'pg',// was postgresql
    connection: {
      database: 'dev',
      user:     'dev',
      password: 'shadow92%'
    },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
};
