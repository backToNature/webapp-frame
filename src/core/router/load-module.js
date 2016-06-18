define(function(require, exports, module) {
    var $$data = require('../util/data-center'),
        debug = $.cookie()['debug_cookie'],
        $$module = require('./module'),
        modules = {};

    var loadModule = function (pageName, data, api) {
        var pageDetail = $$data.get('pageConfig:' + pageName), num = 0,
            $currentWrapper = pageDetail.level === 1 ? $('.doc.level-1 .main') : $('.doc.level-2.active .main'),
            moduleList = _.map(pageDetail.modules, function (item) {
                return item.split('.')[0];
            }),
            newModuleList = _.difference(moduleList, $$data.get('readyModule')),
            currentPageDetail = pageDetail,
            prePageDetail = $$data.get('pageConfig:' + $$data.get('prePage'));

        // 如果是二级页跳三级页，需要改变$currentWrapper
        if (prePageDetail && prePageDetail.level > 1 && currentPageDetail.level > 1) {
            $currentWrapper = $('.doc.level-2').not('.active').find('.main');
        }
        // 记录已经加载过的模块
        $$data.set('readyModule', _.union(moduleList, $$data.get('readyModule')));

        // 替换加载模块路径
        newModuleList = _.map(newModuleList, function (item) {
            return './modules/' + item + '/' + item + '.js';
        });

        var moduleReady = function () {
            $('.main').css('opacity', 1);
            require('./page-animate')(pageName);
        };

        // 如果页面所有模块已经加载过了，直接算完成
        if (!newModuleList.length) { 
            // $(window).trigger('pageLoad', [pageName]);
            moduleReady();
            return;
        }

        if (debug === 'true') {
            newModuleList.forEach(function (item) {
                var moduleName = _.last(item.split('/')).replace('.js', ''),
                $module = $currentWrapper.find('div[node-type="module"]').filter('.module-' + moduleName);
                seajs.use([item.replace('.js', '.css'), item], function () {
                    $$module.set(moduleName, window.mdevApp.exports(data, $module, api, $$module.get('/')));
                    num ++;
                    if (num === newModuleList.length) {
                        // 所有插件加载完成
                        moduleReady();
                    }
                });
            });
        }

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
                    $$module.set(moduleName, window.mdevApp.exports(data, $module, api, $$module.get('/')));
                    if (newModuleList.length) {
                        request();
                    } else {
                        // $(window).trigger('pageLoad', [pageName]);
                    }
                });
            } else {
                $.getScript('.' + temp.split('.')[temp.split('.').length - 2] + '.min.js', function () {
                    $$module.set(moduleName, window.mdevApp.exports(data, $module, api, $$module.get('/')));
                    if (newModuleList.length) {
                        request();
                    } else {
                        // $(window).trigger('pageLoad', [pageName]);
                    }
                });
            }
        };

        // request();
    };
    module.exports = loadModule;
});