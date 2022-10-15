module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    settings: {
        react: {
            version: 'detect',
        },
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
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi', // 'none' or 'semi' or 'comma'
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'comma', // 'semi' or 'comma'
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-var-requires': 0,
        'react/prop-types': 0,
        'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.ts', '.tsx']}],
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': ['error', {before: false, after: true}],
        'eol-last': ['error', 'always'],
        'keyword-spacing': ['error', {before: true, after: true}],
        'max-len': ['error', {code: 160}],
        'no-case-declarations': 'off',
        'no-console': 'off',
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': ['error', {max: 1}],
        'no-undef': 'off',
        'object-curly-spacing': 'error',
        'quotes': ['error', 'single', {avoidEscape: true}],
        'react/display-name': 'off',
        'react/jsx-key': 'error',
        'react/no-find-dom-node': 'off',
        'semi': 'error',
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'react/no-string-refs': 'off',
    },
};
