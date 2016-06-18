define(function(require, exports, module) {
    var $$data = require('../util/data-center'),
        $$api = require('../api/api')
    var router = {
        go: function (pageName, data, isNotRecordHistory) {
            if ($$data.get('currentPage')) {
                $$data.set('prePage', $$data.get('currentPage'));
            }

            $$data.set('currentPage', pageName);
            
            // 初始化渲染
            require('./render')(pageName);
            if (!$$api.router) {
                $$api.router = router;
            }
            // 加载模块js
            require('./load-module')(pageName, data, $$api);

        },
        back: function () {

        },
        forward: function () {

        }
    };
    module.exports = router;
});