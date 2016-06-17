define(function(require, exports, module) {
    var $$data = require('./util/data-center');
    $$data.set('pageConfig', require('../config'));
    console.log($$data.get('pageConfig'));
    var $$router = require('./router/router');

    $$router.go('index');
});