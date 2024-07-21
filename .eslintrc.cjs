module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'react-hooks'
  ],
  rules: {
    // Your custom rules here
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
