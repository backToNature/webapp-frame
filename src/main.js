var util = {
    loadJs: function (src, fun) {
        var head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('charset', 'UTF-8');
        script.setAttribute('src', src);
        if (typeof fun === 'function') {
            if (window.attachEvent) {
                script.onreadystatechange = function () {
                    var r = script.readyState;
                    if (r === 'loaded' || r === 'complete') {
                        script.onreadystatechange = null;
                        fun();
                    }
                };
            } else {
                script.onload = fun;
                script.onerror = fun;
            }
        }
        head.appendChild(script);
    }
};

window.debug = true;

window.tmpFn = [];
if (!window.ready) {
    window.ready = function (fn) {
        window.tmpFn.push(fn);
    };
}

if (debug) {
    util.loadJs('./lib/seajs/sea-1.2.0.js', function () {
        seajs.use('./core/core.js');
    });
} else {
    util.loadJs('./core/core.js');
}

window.ready(function () {
    var api = window.api;
    api.router('pagesA', [], 'A');
});