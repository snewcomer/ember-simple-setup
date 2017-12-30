module.exports = {
  globals: {
    server: true,
  },
  parser: 'babel-eslint',
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
  }
};
