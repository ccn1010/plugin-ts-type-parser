module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-param-reassign': [2, { props: false }],
  },
};
