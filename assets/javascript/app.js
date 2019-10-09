var apiKey = "0354a464611c4f98ae415af555bb745e";
var apiID = "a54a71fd";
var resultDeck = $(".main-menu"); // The div where the search results go.

// When the user clicks on the "search" button...
$("#submit").on("click", function(event) {
    event.preventDefault();
    var searchQuery = $("#search-text");
    search(searchQuery); // Take the user's input and search for recipes.
});

// Search for recipes using AJAX and the Edamam API.
function search(ingredients) {
   var queryURL = "https://api.edamam.com/search?app_id=" + apiID + "&app_key=" + apiKey + "&q=" + ingredients;
   $.ajax({
       url: queryURL,
       method: "GET",
   }).then(function (response) {
       appendSearchResults(response.hits);
   });
}

// Append the search results to the resultDeck.
function appendSearchResults(theResults) {
    for (var i = 0; i < theResults.length; i++) {
        var searchResult = $("<p>");
        searchResult.addClass("search-result");
        searchResult.text(theResults[i].recipe.label);
        resultDeck.append(searchResult);
    }
}