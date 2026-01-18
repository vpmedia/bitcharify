import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

export default defineConfig([
  {
    ignores: [
      '.github/**/*.*',
      '.idea/**/*.*',
      '.vscode/**/*.*',
      'build/**/*.*',
      'coverage/**/*.*',
      'dist/**/*.*',
      'public/**/*.*',
      'types/**/*.*',
      'node_modules/**/*.*',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.browser,
        ...globals.node,
        ...globals.es2026,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      jsdoc: jsdocPlugin,
      unicorn: unicornPlugin,
    },
    settings: {
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': {
        node: true,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jsdocPlugin.configs['flat/recommended-typescript-flavor'].rules,
      ...unicornPlugin.configs.recommended.rules,
      'no-unused-vars': 'off',
      'unicorn/better-regex': 'warn',
      'unicorn/catch-error-name': 'warn',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-for-each': 'warn',
      'unicorn/no-for-loop': 'warn',
      'unicorn/no-negated-condition': 'warn',
      'unicorn/no-new-array': 'warn',
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/no-zero-fractions': 'warn',
      'unicorn/number-literal-case': 'warn',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-code-point': 'warn',
      'unicorn/prefer-global-this': 'warn',
      'unicorn/prefer-math-trunc': 'warn',
      'unicorn/prefer-optional-catch-binding': 'warn',
      'unicorn/prefer-set-has': 'warn',
      'unicorn/prefer-spread': 'warn',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
]);
