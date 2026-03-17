import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/plugin.ts",
  output: {
    file: "com.abguney.tmux.sdPlugin/bin/plugin.js",
    format: "esm",
    sourcemap: true,
  },
  external: ["child_process", "os", "util"],
  plugins: [
    resolve({
      exportConditions: ["node"],
      preferBuiltins: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationMap: false,
    }),
  ],
};
