define(function(require, exports, module) {
    var $$data = require('../util/data-center'),
        $$tpl = require('../../static/tpl');

    var render = function (pageName) {
        var pageDetail = $$data.get('pageConfig:' + pageName),
            $currentWrapper = $('.doc.level-' + pageDetail.level).find('.main');
        $currentWrapper.find('div[node-type="module"]').hide();
        pageDetail.modules.forEach(function (item) {
            var moduleName = item.split('.')[0],
                moduleStatus = item.split('.')[1] || 0,
                tpl = $$tpl[moduleName],
                $module = $currentWrapper
                .find('div[node-type="module"]')
                .filter('.module-' + moduleName);

            $module = $module.length ? $module : $(velocityjs.render(tpl, {status: moduleStatus}));
            $module.show();
            $currentWrapper.append($module);
        });
    };
    module.exports = render;
});