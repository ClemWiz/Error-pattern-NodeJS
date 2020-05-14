module.exports = {
    root: true,
    env: "node",
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "no-use-before-define": ["error", { "functions": false }]
      }
  };