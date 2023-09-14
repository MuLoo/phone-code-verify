import path from "path";
import resolve from "@rollup/plugin-node-resolve"; // 在node_modules 里寻找并绑定第三方依赖
import commonjs from "@rollup/plugin-commonjs";
import rollupTypescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import htmlTemplate from "rollup-plugin-generate-html-template";
import pkg from "./package.json"; // 读取 package.json 配置
import replace from "@rollup/plugin-replace";
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';


const env = process.env.NODE_ENV; // 当前运行环境，可通过 cross-env 命令行设置
const isProd = env === "production";

const name = "RollupTsTemplate"; // umd 模式的编译结果文件输出的全局变量名称
const config = {
  // 入口文件，src/index.ts
  input: path.resolve(__dirname, "src/index.tsx"),
  external: isProd ? ["react", "react-dom"] : null,
  watch: {
    exclude: "node_modules/**",
  },
  output: [
    // commonjs
    {
      file: pkg.main,
      format: "cjs",
    },
    // es module
    {
      file: pkg.module,
      format: "es",
    },
    // umd
    {
      name,
      file: pkg.umd,
      format: "umd",
    },
  ],
  plugins: [
    image(),
    // 解析第三方依赖
    resolve(),
    // 识别 commonjs 模式第三方依赖
    commonjs({
      // 用于处理在CommonJS模块中混合使用ES模块的情况。在某些情况下一些依赖库可能同时使用了CommonJS和ES模块的语法,此配置尝试将这些混合模块转换为纯粹的CommonJS模块
      transformMixedEsModules: true,
    }),
    // rollup 编译 typescript
    rollupTypescript(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "devlopment"), // 否则会报：process is not defined的错
    }),
    // babel 配置
    babel({
      // 编译库使用
      // babelHelpers: isProd ? "bundled" : "runtime",
      babelHelpers: "runtime",
      // 只转换源代码，不转换外部依赖
      exclude: "node_modules/**",
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
    }),
    postcss({
      // extract: true,
      // extract: path.resolve('dist/phoneCodeVerify.css')
    }),
  ],
};
// 若打包正式环境，压缩代码
if (isProd) {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
    }),
  );
} else {
  config.plugins.push(
    serve("dist"),
    livereload("dist"), // 当dist目录中的文件发生变化时，刷新页面
    htmlTemplate({
      template: "./public/index.html",
      target: "./dist/index.html",
    }),
  );
}

export default config;
