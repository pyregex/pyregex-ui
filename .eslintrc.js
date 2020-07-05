module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  plugins: ['svelte3', 'jest'],
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/no-mutable-exports': 0,
        'import/prefer-default-export': 0,
      },
    },
  ],
};
