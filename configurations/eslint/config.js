module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    VERSION: false,
    ENVIRONMENT: false,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'eslint-config-prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'filenames', 'jest'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    camelcase: ['error', { properties: 'always' }],
    'consistent-return': 'off',
    'default-case': 'error',
    'filenames/match-regex': ['error', '^[a-z0-9-]+(.test|.spec|.d)?$', true],
    'filenames/match-exported': ['error', 'kebab', null, false],
    'filenames/no-index': 'off',
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/default': 'error',
    'import/export': 'error',
    'import/exports-last': 'off',
    'import/extensions': ['error', 'never'],
    'import/first': 'error',
    'import/max-dependencies': ['error', { max: 30 }],
    'import/named': 'error',
    'import/namespace': ['error', { allowComputed: true }],
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-commonjs': 'error',
    'import/no-default-export': 'off',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', '**/*.spec.ts'],
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'import/no-internal-modules': 'off',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    'import/no-namespace': 'off',
    'import/no-nodejs-modules': 'off',
    'import/no-unassigned-import': ['error'],
    'import/no-unresolved': 'off',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent'],
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/unambiguous': 'off',
    'import/no-useless-path-segments': 'off',
    'max-depth': ['error', 4],
    'max-len': ['error', { code: 120, tabWidth: 2, comments: 120 }],
    'no-template-curly-in-string': 'error',
    'no-plusplus': 'error',
    'no-duplicate-imports': 'error',
    'prefer-rest-params': 'error',
    'no-unused-vars': 'off',
    'no-cond-assign': ['error', 'except-parens'],
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-handler-names': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-depth': ['error', { max: 6 }],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-no-bind': ['error', { ignoreRefs: true, allowArrowFunctions: true }],
    'react/jsx-no-literals': ['error', { ignoreProps: true }],
    'react/jsx-pascal-case': 'off',
    'react/jsx-props-no-spreading': ['error', { exceptions: ['Component'] }],
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'off',
    'react/no-multi-comp': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'field',
          'private-static-field',
          'public-static-field',
          'constructor',
          'private-instance-method',
          'protected-instance-method',
          'public-instance-method',
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  overrides: [
    {
      files: ['src/**/**.test.ts', 'src/**/**.test.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
