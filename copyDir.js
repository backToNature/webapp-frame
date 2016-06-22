var tools = require('nodejs-tools');
var path = require('path');
tools.file.cpdir(path.join(__dirname, './src'), path.join(__dirname, './build'));
