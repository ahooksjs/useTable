const { execSync } = require('child_process');

const json = JSON.stringify({ version: `0.${Date.now()}.0` });

const cmd = [`echo '${json}' > ./version.json`].join(' && ');
execSync(cmd, { cwd: process.cwd(), stdio: 'inherit' });
