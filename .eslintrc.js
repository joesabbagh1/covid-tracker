module.exports = {
  root: false,
  env: {
    node: true,
    browser: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
    requireConfigFile: false
  },
  plugins: ['prettier'],
  rules: {
  },
};
