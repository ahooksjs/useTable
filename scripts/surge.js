// https://surge.sh/help/adding-a-200-page-for-client-side-routing
const fse = require('fs-extra');

fse.copySync('./dist/index.html', './dist/200.html');
