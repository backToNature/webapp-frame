define(function(require, exports, module) {
    var $$data = require('../util/data-center'),
        $$easing = require('../util/easing');

    var pageForward = function () {
        var prePage = $$data.get('prePage'),
            currentPage = $$data.get('currentPage'),
            prePageDetail = $$data.get('pageConfig:' + prePage),
            currentPageDetail = $$data.get('pageConfig:' + currentPage),
            $current = currentPageDetail.level === 1 ? $('.doc.level-1') : $('.doc.level-2.active'),
            $pre = prePage ? prePageDetail.level === 1 ? $('.doc.level-1') : $('.doc.level-2.active') : undefined;
        console.log(prePage, currentPage);
        if (!prePage) {
            // 首次渲染

        } else {
            if (prePageDetail.level === 1) {
                // 1级页面跳1级页面
                if (currentPageDetail.level === 1) {

                } else {
                    // 1级页面跳2级页面
                    $$easing.easeIn($current, $pre);
                  }
            } else {
                // 2级3级页面跳1级页面
                if (currentPageDetail.level === 1) {
                    $$easing.easeOut($current, $pre);
                } else {
                    // 2级页面跳3级页面
                    $current = $('.doc.level-2').not('.active');
                    $pre.removeClass('active');
                    $current.addClass('active');
                    // 过渡动画
                    if (currentPageDetail.level >= prePageDetail.level) {
                        $$easing.easeIn($current, $pre);
                    } else {
                        $$easing.easeOut($current, $pre);
                    }
                }
            }
        }



        // 记录当前和前页面
        // $$data.set('prePage', $$data.get('currentPage'));
        // $$data.set('currentPage', pageName);
    };
    
    module.exports = pageForward;
});