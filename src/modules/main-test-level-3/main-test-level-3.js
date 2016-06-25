define(function(require, exports, module) {
    'use strict';
    window.mdevApp.exports = function (data, $dom, api, modules) {
        $dom.find('.backToSecond').on('tap', function () {
            api.router.go('demo-level-2');
        });
        $dom.find('.backToTop').on('tap', function () {
            api.router.go('index');
        });
        return {x: 1, v: 2};
    };
});