const dts = require('rollup-plugin-dts').default
const esbuild = require('rollup-plugin-esbuild').default
const { pkgName, pkgFullName } = require('./scripts/constant')

const input = `packages/${pkgName}/index.ts`
const rollupConfig = []
const iifeName = pkgName.substring(0, 1).toUpperCase() + pkgName.substring(1)
const iifeGlobals = {
  [pkgFullName]: iifeName,
}
const external = [pkgFullName]

const esbuildMinifer = (options) => {
  const { renderChunk } = esbuild(options)
  return {
    name: 'esbuild-minifer',
    renderChunk,
  }
}

rollupConfig.push({
  input,
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
    },
    {
      file: 'dist/index.js',
      format: 'iife',
      extend: true,
      name: iifeName,
      globals: iifeGlobals,
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      extend: true,
      name: iifeName,
      globals: iifeGlobals,
      plugins: [esbuildMinifer({
        minify: true,
      })],
    },
  ],
  plugins: [
    esbuild(),
  ],
  external,
})

rollupConfig.push({
  input,
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [
    dts(),
  ],
  external,
})

module.exports = rollupConfig
