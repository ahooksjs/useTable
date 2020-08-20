/**
 * 扔到 npm 上，会同步到各个 CDN 上，方便引用
 */

const { execSync } = require('child_process');
const path = require('path');
const json = require('../version.json');

const packageJSON = JSON.stringify({
  name: 'usetable-ahooks-asset',
  version: json.version,
  publishConfig: {
    registry: 'https://registry.npmjs.org',
  },
});

const cmd = [`echo '${packageJSON}' > ./package.json`, 'npm publish', 'rm ./package.json'].join(
  ' && '
);

execSync(cmd, { cwd: path.resolve(process.cwd(), './dist'), stdio: 'inherit' });
