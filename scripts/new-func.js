const path = require('path')
const fs = require('fs-extra')

const args = process.argv.slice(2)

function run() {
  const newFnName = args[0]

  if (newFnName) {
    const newDir = path.resolve(__dirname, `../packages/${newFnName}`)
    if (fs.existsSync(newDir))
      return
    fs.mkdirSync(newDir)

    const tpl = `/**
 * ${newFnName} function
 *
 */
export function ${newFnName}(): any {
  // code...
}
`
    const testTpl = `import { describe, it, expect } from 'vitest';
import { ${newFnName} } from './index';

describe('${newFnName}', () => {
  it('test describe.', () => {
    expect(${newFnName}());
  });
});
`
    fs.writeFileSync(`${newDir}/index.ts`, tpl, 'utf-8')
    fs.writeFileSync(`${newDir}/index.test.ts`, testTpl, 'utf-8')
  }
}

run()
