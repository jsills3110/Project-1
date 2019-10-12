var apiKey = "4e3dcf2fc1b24adcb55dca009f7a4c1c";

var resultDeck = $(".main-menu"); // The div where the search results go.
var recipeSearchResults = [];

// When the user clicks on the "search" button...
$("#submit").on("click", function (event) {
    event.preventDefault();
    recipes = [];
    var searchQuery = $("#search-text").val().trim();
    search(searchQuery); // Take the user's input and search for recipes.
});

function search(ingredients) {
    var queryURL = "https://api.spoonacular.com/recipes/search?query=" + ingredients + "&instructionsRequired=true&apiKey=" + apiKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response.results);
        appendSearchResults(response.results);
    });
}

// Append the search results to the resultDeck.
function appendSearchResults(theResults) {
    for (var i = 0; i < theResults.length; i++) {
        recipeSearchResults.push(theResults[i].id);
        var searchResult = $("<div>");
        searchResult.addClass("search-result");
        searchResult.attr("data-id", theResults[i].id);
        console.log(theResults[i].id);
        searchResult.html(theResults[i].title);
        console.log(theResults[i].title);
        // add data-label attribute 
        // searchResult.attr("data-label", theResults[i].recipe.label);
        resultDeck.append(searchResult);
    }
}

// Display the ingredients and instructions when the recipe is clicked.
function displayRecipe() {
    // Get the data-label 
    var recipeId = $(this).attr("data-id");

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
    var ingredientsUl = $("<ul>");

    var ingQueryURL = "https://api.spoonacular.com/recipes/" + recipeId + "/ingredientWidget.json?apiKey=" + apiKey;
    // console.log(ingQueryURL);

    $.ajax({
        url: ingQueryURL,
        method: "GET",
    }).then(function (response) {
        // console.log(response.ingredients);

        var ingredients = response.ingredients;

        for (var i = 0; i < ingredients.length; i++) {
            var ingredientLi = $("<li>");
            ingredientLi.text(ingredients[i].amount.us.value + " " + ingredients[i].amount.us.unit + " " + ingredients[i].name);
            ingredientsUl.append(ingredientLi);
        }
    });
    containerDiv.append(ingredientsUl);

    // build Instructions ul
    var instructionsUl = $("<ul>");

    var instQueryURL = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions?apiKey=" + apiKey;
    console.log(instQueryURL);

    $.ajax({
        url: instQueryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response[0].steps);

        var instructions = response[0].steps;

        for (var i = 0; i < instructions.length; i++) {
            var instructionsLi = $("<li>");
            instructionsLi.text(instructions[i].number + " " + instructions[i].step);
            instructionsUl.append(instructionsLi);
        }
    });
    containerDiv.append(instructionsUl);

    // // build url div
    // var recipeDiv = $("<div>");
    // recipeDiv.addClass("col-12");
    // var recipeUrl = $("<a>");
    // recipeUrl.attr("src", recipes[recipeLabel].url);
    // recipeUrl.text(recipes[recipeLabel].url);
    // recipeDiv.append(recipeUrl);
    // containerDiv.append(recipeDiv);


    // add it to div.main-content
    $(".main-content").html(containerDiv);
}

$(document).on("click", ".search-result", displayRecipe);
