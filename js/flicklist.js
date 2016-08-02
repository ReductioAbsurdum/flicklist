

$(document).ready(function() {
  discoverMovies(render);
});



var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "f0486d4c7f2b3a31908d5a7cbaeeee63" // TODO 0 add your api key
}


/**
 * Makes an AJAX request to /discover/movie endpoint of the API
 *
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback();
    }
  });
}


/**
 * Makes an AJAX request to the /search/movie endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(searchTerm, callback) {
  console.log("searching for movies with '" + searchTerm + "' in their title...");

  // TODO 9
  // implement this function as described in the comment above
  // you can use the body of discoverMovies as a jumping off point
	$.ajax({
		url: api.root + "/search/movie",	
		data: {
			api_key: api.token,
			query: searchTerm
		},
		success: function(info){
			console.log(info);
			model.browseItems = info.results;
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();
  
  console.log(model.browseItems);

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemView = $("<li></li>")
      .append(title)
      // TODO 3
      // give itemView a class attribute of "item-watchlist"
      itemView.attr("class", "item-watchlist");

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var button = $("<button></button>")
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      });
      // TODO 2 DONE
      // the button should be disabled if this movie is already in
      // the user's watchlist
      // see jQuery .prop() and Array.indexOf()
     	 if(model.watchlistItems.indexOf(movie) !== -1){
      	button.prop("disabled", true);
      }


    // TODO 1 DONE
    // create a paragraph containing the movie object's .overview value
    // then, in the code block below,
    // append the paragraph in between the title and the button
	var overview = $("<p></p>");
	overview.append(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append($("<hr/>"))
      .append(title)
      .append(overview)
      .append(button);

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
  
}




