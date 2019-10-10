
var resultDeck = $(".main-menu"); // The div where the search results go.
var recipes = [];

// When the user clicks on the "search" button...
$("#submit").on("click", function (event) {
    event.preventDefault();
    recipes = [];
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
        recipes[theResults[i].recipe.label] = theResults[i].recipe;
        var searchResult = $("<p>");
        searchResult.addClass("search-result");
        searchResult.text(theResults[i].recipe.label);
        // add data-label attribute 
        searchResult.attr("data-label", theResults[i].recipe.label);
        resultDeck.append(searchResult);
    }
}

function displayRecipe() {
    // Get the data-label 
    var recipeLabel = $(this).attr("data-label");
    
    // build the div - row
    var containerDiv = $("<div>");
    containerDiv.addClass("row");

    // build h3 label
    var labelDiv = $("<div>");
    labelDiv.addClass("col-12");
    var labelH3 = $("<h3>");
    labelH3.text("Ingredients");
    labelDiv.append(labelH3);
    containerDiv.append(labelDiv);

    // build Ingredients ul
    var ingerdientsUl = $("<ul>");
    for (var i = 0; i < recipes[recipeLabel].ingredientLines.length; i++) {
        var ingerdientLi = $("<li>");
        ingerdientLi.text(recipes[recipeLabel].ingredientLines[i]);
        ingerdientsUl.append(ingerdientLi);

    }
    containerDiv.append(ingerdientsUl);

    // build url div
    var recipeDiv = $("<div>");
    recipeDiv.addClass("col-12");
    var recipeUrl = $("<a>");
    recipeUrl.attr("src", recipes[recipeLabel].url);
    recipeUrl.text(recipes[recipeLabel].url);
    recipeDiv.append(recipeUrl);
    containerDiv.append(recipeDiv);


    // add it to div.main-content
    $(".main-content").html(containerDiv);
}

$(document).on("click", ".search-result", displayRecipe);
