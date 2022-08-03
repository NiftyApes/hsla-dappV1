module.exports = {
  extends: ['react-app', 'prettier', 'plugin:react-hooks/recommended'],
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
    tsconfigRootDir: '.',
    project: ['./tsconfig.json'],
    projectFolderIgnoreList: [
      'node_modules',
      'dist',
      'build',
      '.yarn',
      'build-utils',
      './src/generated',
    ],
    extraFileExtensions: ['.sol'],
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-duplicate-imports': 'error',
    'react/no-unescaped-entities': 'warn',
    quotes: 'off',
  },
};
