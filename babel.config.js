module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        /* Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败 */
        modules: false,
        // useBuiltIns: "usage",
        useBuiltIns: "entry",
        corejs: "2.6.10",
        targets: {
          ie: 10,
        },
      },
    ],
    ["@babel/preset-react"],
  ],
  plugins: [
    [
      // 与 babelHelpers: 'runtime' 配合使用,避免重复打包
      "@babel/plugin-transform-runtime",
    ],
  ],
  ignore: ["node_modules/**"],
};
