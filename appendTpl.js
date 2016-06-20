var path = require('path');
var fs = require('fs');
var util = require('util');

var appendTpl = function (modulesDir) {
	var tpl = 'define(function(require, exports, module) {var page = {%s};module.exports = page;});';
	var single = "'%s': require('../modules/%s/%s.html'),";
	var buffer = '';
	fs.readdirSync(modulesDir).forEach(function (item) {
		if (path.extname(item) === '') {
            buffer += util.format(single, item, item, item);
        }
	});
	buffer = buffer.substring(0, buffer.length - 1);
	buffer = util.format(tpl, buffer);
	console.log(buffer)
	fs.writeFile(path.join(__dirname, '/src/static/tpl.js'), buffer, 'utf8');
};

module.exports = appendTpl;
