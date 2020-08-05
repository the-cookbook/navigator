const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const external = require('rollup-plugin-peer-deps-external');
const { terser } = require('rollup-plugin-terser');

const pkg = require('../../package.json');
const pkgName = 'navigator';

const global = ['history', 'react', ...Object.keys(pkg.dependencies)];

const common = (minify = false) => ({
  input: './lib/index.js',
  plugins: [
    external(),
    resolve({
      mainFields: ['module', 'main'],
    }),
    commonjs(),
    minify && terser(),
  ].filter(Boolean),
  external: global,
});

const cjs = [
  {
    output: [
      {
        file: `lib/${pkgName}.js`,
        sourcemap: true,
        format: 'cjs',
      },
    ],
    ...common(),
  },
  {
    output: [
      {
        file: `lib/${pkgName}.min.js`,
        sourcemap: true,
        format: 'cjs',
      },
    ],
    ...common(true),
  },
];

const umd = [
  {
    output: [
      {
        file: `lib/${pkgName}.umd.js`,
        sourcemap: true,
        format: 'umd',
        name: 'navigator',
        interop: false,
        globals: {
          'react': 'react',
          'path-to-regexp': 'pathToRegexp'
        },
      },
    ],
    ...common(),
  },
  {
    output: [
      {
        file: `lib/${pkgName}.umd.min.js`,
        sourcemap: true,
        format: 'umd',
        name: 'navigator',
        interop: false,
        globals: {
          'react': 'react',
          'path-to-regexp': 'pathToRegexp'
        },
      },
    ],
    ...common(true),
  },
];

module.exports.pkgName = pkgName;
module.exports = [...cjs, ...umd];
