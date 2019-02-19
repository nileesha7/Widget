//Reference: http://alexmarandon.com/articles/web_widget_jquery/

(function() {

var jQuery;

if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { 
      script_tag.onload = scriptLoadHandler;
    }
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}

/******** Our main function ********/
function main() { 
    jQuery(document).ready(function($) { 
    	$("#submit").click(function(e) {
   			e.preventDefault();
			var id = $("#itemId").val();
			var url = 'http://localhost:3000/api/ratingaverage/json?id='+id;

			$.ajax( {
		    	url: url,
		    	dataType: 'json',
		    	type: 'GET',
	
		   		success: function(response) {
              var item = response.item;
		       		var ratingAverage = '<p> id: ' + item.id + '</p>';
		       		ratingAverage += '<p>name: ' + item.name + '</p>';
		       		ratingAverage += '<p>average: ' + item.average + '</p>';
		       		ratingAverage += '<p>ratings Count: ' + item.ratingsCount + '</p>';

		       		$('#ratings-widget').html(ratingAverage);
		       
		   		},
		    	error: function(error){
		       		$('#ratings-widget').html('<p>Item not found.</p>');
		    	}
			});
    	});
    });
}

})(); // We call our anonymous function immediately