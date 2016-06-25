define(function(require, exports, module) {
    'use strict';
    window.mdevApp.exports = function (data, $dom, api, modules) {
        $dom.find('.backToTop').on('tap', function () {
            api.router.go('index');
        });
        $dom.find('.GoToThird').on('tap', function () {
            api.router.go('demo-level-3');
        });
        return {x: 1, v: 2};
    };
});