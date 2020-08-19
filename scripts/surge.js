const fse = require('fs-extra');

fse.copySync('./dist/index.html', './dist/200.html');
