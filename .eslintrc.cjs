module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-console": "off",
        "quotes": [
            "error",
            "double"
        ],
        "no-plusplus": "off",
        "indent": ["warn", 2],
        "semi": ["warn", "always"],
        "import/extensions": "off",
        "no-undef": "off",
        "no-unused-vars": "warn", 
        "no-use-before-define": "off",
        "react/prop-types": "off"
  },
}
