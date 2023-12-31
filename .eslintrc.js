module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "eslint-config-standard",
    "plugin:@typescript-eslint/recommended", // 使用@typescript-eslint/eslint-plugin的推荐规则
    "prettier", // 放在最后
  ],
  plugins: ["prettier"], // 集成prettier
  rules: {
    "prettier/prettier": "error", // 对于不符合prettier报eslint错误
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
  },
};
