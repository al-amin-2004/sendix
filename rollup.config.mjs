import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';



export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
    },
  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
    resolve(),
    json(),
  ],
};
