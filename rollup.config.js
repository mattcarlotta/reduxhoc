import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const terserOptions = {
  compress: {
    warnings: false,
    comparisons: false,
    inline: 2
  },
  mangle: {
    safari10: true
  },
  output: {
    comments: false,
    ascii_only: true
  }
};

export default [
  {
    preserveModules: true,
    input: ["index.ts"],
    output: [{ dir: "esm", format: "esm", entryFileNames: "[name].mjs" }],
    external: ["react", "react-redux"],
    plugins: [
      typescript({ tsconfig: "./ts/tsconfig.esm.json" }),
      terser(terserOptions)
    ]
  }
];
