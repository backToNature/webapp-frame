define(function(require, exports, module) {
    require('./main-test.css');
    console.log('main-test');
    module.exports = function (data, $dom, api, modules) {
        console.log('main-test');
    };
});