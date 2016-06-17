define(function(require, exports, module) {
    var $$data = require('../util/data-center');
    var router = {
        go: function (pageName, data, isNotRecordHistory) {
            if ($$data.get('currentPage')) {
                $$data.set('prePage', $$data.get('currentPage'));
            }

            $$data.set('currentPage', pageName);
            
            // 初始化渲染
            require('./render')(pageName);

            // 加载模块js
            require('./load-module')(pageName, data);

        },
        back: function () {

        },
        forward: function () {

        }
    };
    module.exports = router;
});