
window.tmpFn = [];
if (!window.ready) {
    window.ready = function (fn) {
        window.tmpFn.push(fn);
    };
}

window.ready(function () {
    window.api.util.loadJs('./extensions/bottom-tap-1/bottom-tap-1.js');
});