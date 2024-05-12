module.exports = {
  env: { es6: true, node: true },
  extends: ['./eslint-config', 'eslint:recommended', 'prettier'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
  },
};
