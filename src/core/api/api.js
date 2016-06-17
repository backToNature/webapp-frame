define(function(require, exports, module) {
    var api = {};
    api.router = _.extend(api, require('../router/router'));
    module.exports = api;
});