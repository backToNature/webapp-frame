define(function(require, exports, module) {
    window.api = {};
    var $$util = window.api.util = require('./util/util');
    window.tmpFn.forEach(function (item) {
        item();
    });
});