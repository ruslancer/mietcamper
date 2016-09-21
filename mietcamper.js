//cdn.rawgit.com
//rawgit.com
(function () {
    function loadScriptJquery(url, callback) {
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
        document.getElementsByTagName("body")[0].appendChild(script);
    }
    loadScriptJquery("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
        jQuery.noConflict();
		jQuery(document).ready(function() {
			console.log('jquery loaded');
			jQuery.ajax({
				url: "https://rawgit.com/ruslancer/mietcamper/master/mietcamper_jsonp.js",
				jsonpCallback: "callback_mietcamper",
				dataType: "jsonp",
				success: function( response ) {
					setupMietcamperForm(response);
				}
			});
		});
		var data = [], cl, dtStart, dtEnd;
		function updateResults() {
			console.log("Results: ", cl.val(), dtStart.val(), dtEnd.val());
		}
		function setupMietcamperForm(response) {
			data = response;
			
			cl = jQuery("[name=class_ber1]");
			dtStart = jQuery("[name=date]");
			dtEnd = jQuery("[name=datum_ende]");
			
			cl.on('keyup', function () {
				updateResults();
			});
			dtStart.on('keyup', function () {
				updateResults();
			});
			dtEnd.on('keyup', function () {
				updateResults();
			});
		}
    });
})();