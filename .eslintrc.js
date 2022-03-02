module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-duplicate-imports': 'error',
    'react/no-unescaped-entities': 'error',
    quotes: 'off',
  },
};
