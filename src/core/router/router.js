define(function(require, exports, module) {
    var $$data = require('../util/data-center');
    var router = {
        router: function (pageName, data, isNotRecordHistory) {

            if ($$data.get('currentPage')) {
                $$data.set('prePage', $$data.get('currentPage'));
            }

            $$data.set('currentPage', pageName);

            // 加载模块js
            require('./load-module')(pageName);

            // 初始化渲染
            require('./render')(pageName);

        },
        back: function () {

        },
        forward: function () {

        }
    };
    module.exports = router;
});