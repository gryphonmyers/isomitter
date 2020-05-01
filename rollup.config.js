import { terser } from "rollup-plugin-terser";

export default [{
    input: './lib/node.js',
    output: {
      file: 'dist/isomitter-node.cjs.js',
      format: 'cjs'
    }
}, {
    input: './lib/node.js',
    output: {
      file: 'dist/isomitter-node.cjs.min.js',
      plugins: [terser()],
      format: 'cjs'
    }
}, {
    input: './lib/node.js',
    output: {
      file: 'dist/isomitter-node.esm.js',
      format: 'esm'
    }
}, {
    input: './lib/node.js',
    output: {
      file: 'dist/isomitter-node.esm.min.js',
      plugins: [terser()],
      format: 'esm'
    }
},{
  input: './lib/browser.js',
  output: {
    file: 'dist/isomitter-browser.cjs.js',
    format: 'cjs'
  }
}, {
  input: './lib/browser.js',
  output: {
    file: 'dist/isomitter-browser.cjs.min.js',
    plugins: [terser()],
    format: 'cjs'
  }
}, {
  input: './lib/browser.js',
  output: {
    file: 'dist/isomitter-browser.esm.js',
    format: 'esm'
  }
}, {
  input: './lib/browser.js',
  output: {
    file: 'dist/isomitter-browser.esm.min.js',
    plugins: [terser()],
    format: 'esm'
  }
}];