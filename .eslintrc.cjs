module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', '.gitignore'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-max-props-per-line': ['error', { 'maximum': 1 }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        'declaration': 'parens-new-line',
        'assignment': 'parens-new-line',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'parens-new-line',
      },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': ['error', { 'allow': ['arrowFunctions'] }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'semi': ['error', 'always'],
    'endOfLine': 'off',
    'array-element-newline': [
      'error',
      {
        'ArrayExpression': 'consistent',
        'ArrayPattern': { 'minItems': 3 },
      },
    ],
    'object-curly-spacing': ['error', 'always', { 'arraysInObjects': false }],
    'no-trailing-spaces': ['error', { 'ignoreComments': true }],
    'prettier/prettier': ['error', { 'endOfLine': 'auto' }],
    'jsx-quotes': ['error', 'prefer-double'],
  },
  'overrides': [
    {
      'files': ['*.js'],
      'rules': {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      'files': ['*.tsx'],
      'rules': {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'jsx-quotes': ['error', 'prefer-double'],

      },
    },
  ],
};
