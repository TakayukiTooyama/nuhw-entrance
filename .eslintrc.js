module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json' },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['simple-import-sort', 'import-access'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
    'no-restricted-syntax': [
      'error',
      { selector: 'TSEnumDeclaration', message: "Don't declare enums" },
    ],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'func-style': ['error', 'expression'],
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true },
    ],
    'no-restricted-imports': [
      'error',
      { paths: [{ name: 'react', importNames: ['default'] }] },
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'error',
    'react/destructuring-assignment': ['error', 'always'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import-access/jsdoc': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports' },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['no', 'is', 'has', 'should'],
        filter: { regex: '^_', match: false },
      },
    ],
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  overrides: [
    {
      files: ['src/pages/**/*.tsx', 'src/pages/api/**/*.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
