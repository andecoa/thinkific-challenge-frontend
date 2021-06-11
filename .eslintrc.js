module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": "off", // next.js does not require `import React...`
  },
};
