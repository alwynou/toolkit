const { execSync } = require('child_process')
const consola = require('consola')

execSync('pnpm run build', { stdio: 'inherit' })

execSync('npm publish --access public', { stdio: 'inherit' })

consola.success('Published.')
