module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/prop-types": "off",
    "no-alert": "off",
    "camelcase": "off",
    "no-use-before-define": "off",
    "react/button-has-type": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "react/destructuring-assignment": "off",
    "jsx-a11y/label-has-associated-control": "off"
  },
};
