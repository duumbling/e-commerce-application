module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.{ts,tsx}"],
    },
  ],
  plugins: ["react", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: [".eslintrc.js", "*.html"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
