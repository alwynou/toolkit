const eol = require('os').EOL;
const path = require('path');
const fs = require('fs-extra');
const { pkgName } = require('./constant');

const resolve = (dir) => path.resolve(__dirname, dir);

const dirs = fs.readdirSync(resolve('../packages'));

const funcNames = dirs.filter((name) => !name.startsWith('_') && name !== pkgName);

let fileContent = '';

funcNames.forEach((name) => {
  fileContent += `export * from '../${name}'${eol}`;
});

fs.writeFileSync(resolve(`../packages/${pkgName}/index.ts`), fileContent, 'utf-8');
