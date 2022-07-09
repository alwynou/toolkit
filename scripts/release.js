const { execSync } = require('child_process')
const consola = require('consola')

consola.info('Running test...')
execSync('pnpm run test', { stdio: 'inherit' })
consola.success('Test success...')

consola.info('Choose version...')
execSync('npx bumpp', { stdio: 'inherit' })
