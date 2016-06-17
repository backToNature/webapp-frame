define(function(require, exports, module) {
    var $$data = require('../util/data-center'),
        debug = $.cookie()['debug_cookie'],
        $$module = require('./module'),
        $$api = require('../api/api'),
        modules = {};

    var loadModule = function (pageName, data) {
        var pageDetail = $$data.get('pageConfig:' + pageName),
            $currentWrapper = pageDetail.level === 1 ? $('.doc.level-1 .main') : $('.doc.level-2.active .main'),
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

            var temp = newModuleList.shift(),
            moduleName = _.last(temp.split('/')).replace('.js', ''),
            $module = $currentWrapper.find('div[node-type="module"]').filter('.module-' + moduleName);

            if (debug === 'true') {
                seajs.use([temp.replace('.js', '.css'), temp], function () {
                    $$module.set(moduleName, window.mdevApp.exports(data, $module, $$api, $$module.get('/')));
                    if (newModuleList.length) {
                        request();
                    } else {
                        // $(window).trigger('pageLoad', [pageName]);
                    }
                });
            } else {
                $.getScript('.' + temp.split('.')[temp.split('.').length - 2] + '.min.js', function () {
                    $$module.set(moduleName, window.mdevApp.exports(data, $module, $$api, $$module.get('/')));
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