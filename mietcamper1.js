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
    loadScriptJquery("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js", function () {
		var data = [], cl, dtStart, dtEnd;
		
        jQuery.noConflict();
		jQuery(document).ready(function() {
			console.log('jquery loaded');
			jQuery.ajax({
				url: "https://rawgit.com/ruslancer/mietcamper/master/mietcamper_jsonp1.js",
				jsonpCallback: "callback_mietcamper",
				dataType: "jsonp",
				success: function( response ) {
					setupMietcamperForm(response);
				}
			});
		});
		function updateResults() {
			cl = jQuery('input#class_ber1');
			dtStart = jQuery('input#date');
			dtEnd = jQuery('input#datum_ende');
			dlTStart = jQuery("#uhrzeit");
			dlTEnd = jQuery("#feld3");
			var stm, etm;			
			//start date
			if (dlTStart.val() == 'Uhrzeit') {
				stm = '00:00';
			} else {
				stm = dlTStart.val().replace('Uhr', '').replace(' ', '');
			}
			var st = moment(dtStart.val() + " " + stm, "DD.MM.YYYY HH:mm").unix();
			//end date 
			if (dlTEnd.val() == 'Uhrzeit') {
				etm = '23:59';
			} else {
				etm = dlTEnd.val().replace('Uhr', '').replace(' ', '');
			}			
			var en = moment(dtEnd.val() + " " + etm, "DD.MM.YYYY HH:mm").unix();
			var total_days = 0;
			var total_price = 0;
			
			console.log("Results", st + " - " + en);
			if (st>0 && en>0 && typeof data[new String(cl.val())] != 'undefined') {
				var items = data[cl.val()];
				for (var i=0; i<items.length; i++) {
					for (var j=0; j<items[i].range.length; j++) {
						var interv = items[i].range[j].split(' - ');
						var f = moment(interv[0], "DD.MM.YYYY").unix();
						var t = moment(interv[1], "DD.MM.YYYY").unix();
						var s = st; if (st<f) s = f;
						var e = en; if (en>t) e = t;
			
						var days_in_interval = parseInt( ((e-s)/(3600*24)).toFixed(0) );
						if (days_in_interval>0) {
							console.log(interv,  days_in_interval);
							total_days += days_in_interval;
						}
						
						var price = 0;
						if (typeof items[i].value.ab3Wo != 'undefined' && days_in_interval>21) {
							price = parseFloat(items[i].value.ab3Wo);
						} else if (typeof items[i].value.ab2Wo != 'undefined'&& days_in_interval>14) {
							price = parseFloat(items[i].value.ab2Wo);
						} else if (typeof items[i].value.ab1Wo != 'undefined' && days_in_interval>7) {
							price = parseFloat(items[i].value.ab1Wo);
						} else if (typeof items[i].value.ab1Tag != 'undefined' && days_in_interval>0) {
							price = parseFloat(items[i].value.ab1Tag);
						}
						total_price += price * days_in_interval;
					} 
				}
			}
			console.log("Total days: ", total_days, "Total price: ", total_price);
			jQuery("input#gesamtpreis").val(total_price);
			jQuery("input#totaldays").val(total_days);
		}
		function setupMietcamperForm(response) {
			data = response;
			jQuery(document.body).on('change', '#typ',  function (e) {
				updateResults();
			});
			jQuery(document.body).on('change', '[name^="marke"]',  function (e) {
				updateResults();
			});		
			document.getElementById('date').onchange = function(e) {
			  updateResults();
			  return false;
			};
			document.getElementById('datum_ende').onchange = function(e) {
			  updateResults();
			  return false;
			};
			document.getElementById('uhrzeit').onchange = function(e) {
			  updateResults();
			  return false;
			};
			document.getElementById('feld3').onchange = function(e) {
			  updateResults();
			  return false;
			};
		}
		
    });
})();