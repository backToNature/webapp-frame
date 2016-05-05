define(function(require, exports, module) {
    module.exports = {
        loadCss: function(url) {
            var container = document.getElementsByTagName("head")[0];
            var addStyle = document.createElement("link");
            addStyle.rel = "stylesheet";
            addStyle.type = "text/css";
            addStyle.media = "screen";
            addStyle.href = url;
            container.appendChild(addStyle);
        },
        loadHtml: function (fileUrl) {
            $.ajax({ 
                async: false, 
                type : "get", 
                url : fileUrl, 
                dataType : 'text', 
                success : function(data) { 
                    console.log(data); 
                } 
            }); 
        },
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
});