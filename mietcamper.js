(function () {
    function loadScript(url, callback) {
        var script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
        //jQuery loaded
		jQuery.noConflict();
		(function( $ ) {
		  $(document)ready(function() {
			// More code using $ as alias to jQuery
			console.log('jquery loaded');
		  });
		})(jQuery);
    });
})();