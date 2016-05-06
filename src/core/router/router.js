define(function(require, exports, module) {
    var $$util = require('../util/util');
    var pageData;
    var getPageConfig = function (fn) {
        if (pageData) {
            fn(pageData);
        } else {
            $.getJSON('./page.json', function (data) {
                fn(data);
            });
        }
    };

    var router = function (pageName, extensionStatus, easing) {
        if (!_.isString(pageName) && !_.isArray(extensionStatus) && !_.isString(easing)) {
            console.error('api.router --> parameter error');
            return;
        }

        var fnGetPageConfig = function (data) {
            var modules = data[pageName].modules;
            if (_.contains(_.keys(data), pageName)) {
                var extensionsList = _.flatten(_.values(modules));
                extensionsList = _.map(extensionsList, function(item){ 
                    return  './extensions/' + item + '/' + item + '.js';
                });

                Backbone.Events.on('pageLoad', function (pageName) {
                    _.map(data[pageName].modules, function (val, key) {
                        _.map(val, function (item) {
                            $('.' + key).append(window.extensions[item].dom);
                        });
                    });
                    console.log(data[pageName].modules);
                });

                var request = function () {
                    if (!extensionsList.length) {
                        // require('./api/events.js').ready();
                        Backbone.Events.trigger('pageLoad', pageName);
                        return;
                    }
                    if (window.debug === true) {
                        seajs.use(extensionsList.shift(), function () {
                            if (extensionsList.length) {
                                request();
                            } else {
                                // require('./api/events.js').ready();
                                Backbone.Events.trigger('pageLoad', pageName);
                            }
                        });
                    } else {
                        $$util.loadJs(extensionsList.shift(), function () {
                            if (extensionsList.length) {
                                request();
                            } else {
                                Backbone.Events.trigger('pageLoad', pageName);
                                // require('./api/events.js').ready();
                            }
                        });
                    }
                };
                request();
            } else {
                console.error('api.router --> page not found');
            }
        };
        getPageConfig(fnGetPageConfig);
    };
    module.exports = router;
});