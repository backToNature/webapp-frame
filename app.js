var tool = require('nodejs-tools');
var path = require('path');
var fs = require('fs');
var extensionDir = path.join(__dirname, '/src/modules');

var util = {
    hasArgument: function (param) {
        var arguments = process.argv.splice(2);
        if(arguments.some(function (item) {
            return item === param;
        })) {
            return true;
        } else {
            return false;
        }
    }
};

var htmlToJs = function (filePath) {
    var htmlString = fs.readFileSync(filePath, 'utf8');
    var re = tool.htmlToJs(htmlString);
    fs.writeFileSync(path.join(path.dirname(filePath), path.basename(filePath) + '.js'), re, 'utf8');
    console.log('compiled success:' + path.basename(filePath) + '.js');
};

var buildSingleExtension = function (extensionName) {
    var extensionPath = path.join(extensionDir, extensionName);
    fs.readdirSync(extensionPath).forEach(function (item) {
        if (path.extname(item) === '.html') {
            htmlToJs(path.join(extensionPath, item));
        }
    });
};

var buildAllExtension = function (extensionDir) {
    fs.readdirSync(extensionDir).forEach(function (item) {
        if (path.extname(item) === '') {
            buildSingleExtension(item);
        }
    });
};

buildAllExtension(extensionDir);
var watcher = {
    start: function (extensionDir) {
        fs.readdirSync(extensionDir).forEach(function (item) {
            if (path.extname(item) === '') {
                fs.watch(path.join(extensionDir, item), function (event, filename) {
                    if (path.extname(filename) === '.html') {
                        htmlToJs(path.join(extensionDir, item, filename));
                        require('./appendTpl')(extensionDir);
                    }
                });
            }
        });
    }
};
watcher.start(extensionDir);
console.log('监听启动');