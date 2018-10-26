// Waits for the DOM to load before running the js.
$(document).ready(function() {

	// Variable to hold the array of "topic", in this case Harry Potter characters.
	var topics = [
		'Harry Potter',
		'Hermione Grainger',
		'Ron Weasley',
		'Voldemort',
		'Dumbledore',
		'Draco Malfoy',
		'Severus Snape',
		'Luna Lovegood',
		'Neville Longbottom',
		'Cedric Diggory'];

	// This function loops through the topics array and creates a button for each while writing each button to the DOM.
	function renderButtons(){
		// Prevents the entire array being posted with each button click.
		$("#button-div").empty();
        for (var i = 0; i < topics.length; i++) {
			var btn = $("<button>");
			btn.addClass("topic");
			btn.attr("data-name", topics[i]);
			btn.text(topics[i]);
			$("#button-div").append(btn);
        }
    }

	// Listener for clicks on the submit button - 
	$('#add-topic').on('click', function(event){
		event.preventDefault();
		// Adds (pushes) the user input to the array of topics.
		var topic = $('#topic-input').val().trim();
		topics.push(topic);
		// Calls the function above to write (append) the new button to the button-div.
		renderButtons();
    });

	// Listens for clicks on the dynamically generated topic buttons.
    $(document).on('click', ".topic", displayGif);

	// This function logs the topic selected and uses an API to populate the page with relevent content.
	function displayGif() {
		// Logs the topic selected and prints it to the console so that we can see what's happening.
		var topic = $(this).attr('data-name');
		console.log("topic is " + topic);

		// Sends the API query out to a URL.
		var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		// Uses ajax to get the response data back.
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);
        	var results = response.data;

			// Loops through the results array and assigns the data to a div.
        	for (var i = 0; i < results.length; i++){
				// Assigns the gifs to a div with the class of "giffs".
				var gifDiv = $('<div class="gifs">');
				// Pulls in the ratings data, console logs it.
	        	var rating = response.data[i].rating;
				console.log("rating is " + rating);
				// Pulls in the titles data and console logs it.
				var title = response.data[i].title;
				console.log("title is " + title);
				var titleDiv = $('<div class="titleText">').html("<strong style='color: rgba(128, 0, 0, 1);'>Title: </strong>" + title);
				// Convirts the rating to UPPERCASE
				var ratingUpper = rating.toUpperCase();
				// Assigns the rating text data to a new div.
				var ratingDiv = $('<div class="titleText">').html("<strong style='color: rgba(128, 0, 0, 1);'>Rating: </strong>" + ratingUpper);
			

			
				// If there is no ratings data available, creates our own rating of "unrated".
	        	if (rating === ""){
	        		rating = 'Unrated';      		
				}
				// If there is no title data available, displays "No title available".
				if (title === ""){
	        		title = 'No title available';      		
				}

				// Creates the image tiles and layers the dater we are pulling in from the API response.
				// Also fixes the sizes of the still images and giffs when switiching between states.
	         	var image = $('<img>')
	         	image.attr("src", results[i].images.fixed_height.url); 
        		image.attr('data-state', 'animate');
        		image.attr('data-still', results[i].images.fixed_height_still.url);
        		image.attr('data-animate', results[i].images.fixed_height.url);
				gifDiv.append(image);
				gifDiv.append(titleDiv);
				gifDiv.append(ratingDiv);
	        	image.addClass('gif');
	        	$('#gifDisplay').prepend(gifDiv);
        	}
     	});
    }

	// Listener for clicks on the image tiles and console logs the results.
    $("body").on('click', '.gif', (function() {
    	console.log("gif button is clicked");
    	var state = $(this).attr('data-state');
		console.log('state is ' + state);
		// If the image is still - Animate.
    	if (state === 'still'){
    		$(this).attr('src', $(this).attr('data-animate'));
			$(this).attr('data-state', 'animate');
		// Else, swap it for a still. This if/else statement creates the toggle effect.
    	} else {
    		$(this).attr('src', $(this).attr('data-still'));
    		$(this).attr('data-state', 'still');
		}
		// Console logs current state.
    	console.log('state is now ' + state);
	}));
	// Runs the renderButton function (effectivly the "set-up".)
    renderButtons();
});















