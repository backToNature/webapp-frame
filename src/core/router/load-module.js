define(function(require, exports, module) {
    var $$data = require('../util/data-center'),
        debug = $.cookie()['debug_cookie'];

    var loadModule = function (pageName) {
        var pageDetail = $$data.get('pageConfig:' + pageName), temp,
            moduleList = _.map(pageDetail.modules, function (item) {
                return item.split('.')[0];
            }),
            newModuleList = _.difference(moduleList, $$data.readyExtension);

        $$data.set('readyModule', _.union(moduleList, $$data.get('readyModule')));

        // 替换加载模块路径
        newModuleList = _.map(newModuleList, function (item) {
            return './modules/' + item + '/' + item + '.js';
        });

        var request = function () {
            if (!newModuleList.length) { 
                // $(window).trigger('pageLoad', [pageName]);
                return;
            }

            if (debug === 'true') {
                seajs.use(newModuleList.shift(), function () {
                    if (newModuleList.length) {
                        request();
                    } else {
                        // $(window).trigger('pageLoad', [pageName]);
                    }
                });
            } else {
                temp = newModuleList.shift();
                $.getScript('.' + temp.split('.')[temp.split('.').length - 2] + '.min.js', function () {
                    if (newModuleList.length) {
                        request();
                    } else {
                        // $(window).trigger('pageLoad', [pageName]);
                    }
                });
            }
        };

        request();
    };
    module.exports = loadModule;
});