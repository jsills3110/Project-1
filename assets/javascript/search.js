// *************************************************************
//
// Author(s): Jessica Sills and Dima Dibb
// Date: 10/12/2019
// 
// search.js searches for recipes using the Spoonacular API. A
// user can either search for specific recipes based on 
// ingredients or type, or they can get a set of random recipes.
//
// *************************************************************

var resultDeck = $(".search-results"); // The div where the search results go.
var ingAndButtonsRow = $("#ing-and-buttons"); // Find the ing-and-buttons row. 
var recipeInstRow = $("#recipe-instructions"); // Find the recipe-instructions row.

// When the user clicks on the "search" button...
$("#submit").on("click", function (event) {
    event.preventDefault();
    $("#warning").text(""); // Empty the warning header.
    var searchQuery = $("#search-text").val().trim();
    $("#search-text").val(""); // Empty the search box.
    validateInput(searchQuery);
});

// Check the input for invalid characters. If it looks good, perform the search. Otherwise,
// inform the user what they did wrong.
function validateInput(theSearch) {
    if (theSearch === "") {
        $("#warning").text("You can't search for nothing, try again.");
    } else if (checkAlphanumeric(theSearch)) {
        var queryURL = "https://api.spoonacular.com/recipes/search?query=" + theSearch + "&instructionsRequired=true&apiKey=" + apiKey;
        search(queryURL, "basicSearch"); // Take the user's input and search for recipes.
    } else {
        $("#warning").text("Allowed characters: letters, numbers, -, and '. Please try again.");
    }
}

// Check the search input for any characters other than letters, numbers, spaces, ', and -.
function checkAlphanumeric(theSearch) {
    for (var i = 0; i < theSearch.length; i++) {
        var code = theSearch.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123) && // lower alpha (a-z)
            !(code === 32) && !(code === 39) &&
            !(code === 45)) {
            return false;
        }
    }
    return true;
}

// When the Suprise Me!! button is clicked, trigger the surprise function.
$("#surprise").on("click", function () {
    var queryURL = "https://api.spoonacular.com/recipes/random?number=10&instructionsRequired=true&apiKey=" + apiKey;
    search(queryURL, "surpriseSearch"); // Take the user's input and search for recipes.
});

// Search the spoonacular API using the provided URL.
function search(theURL, theType) {
    $.ajax({
        url: theURL,
        method: "GET",
    }).then(function (response) {
        if (theType === "basicSearch") {
            appendSearchResults(response.results);
        } else if (theType === "surpriseSearch") {
            appendSearchResults(response.recipes);
        }
    });
}

// Append the search results to the resultDeck.
function appendSearchResults(theResults) {
    $(".search-results").empty();
    if (theResults.length === 0) {
        var searchResult = $("<div>");
        searchResult.html("We couldn't find anything with that search. Try again!");
        resultDeck.append(searchResult);
    } else {
        for (var i = 0; i < theResults.length; i++) {
            var searchResult = $("<div>");
            searchResult.addClass("search-result");
            searchResult.attr("data-id", theResults[i].id);
            searchResult.html(theResults[i].title);
            resultDeck.append(searchResult);
        }
    }
}

// Add the recipe ingredients and instructions to a JSON object and call Ray's display function.
function getRecipeAndDisplay() {

    // Get the data-label 
    var recipeId = $(this).attr("data-id");

    var recipeJSON = {
        spoonId: recipeId,
        title: $(this).html(),
        ingredients: [],
        instructions: []
    }

    // Show related images
    displayRecipeImage(recipeJSON.title);
    callIngredients(recipeJSON, recipeId);
}

// callIngredients calls the spoonacular ingredientWidget, which retrieves the ingredients of a recipe.
// It adds the ingredients to the temporary recipe JSON.
function callIngredients(theJSON, theId) {

    var ingQueryURL = "https://api.spoonacular.com/recipes/" + theId + "/ingredientWidget.json?apiKey=" + apiKey;

    $.ajax({
        url: ingQueryURL,
        method: "GET",
    }).then(function (response) {

        var ingredients = response.ingredients; // Get the ingredients array from the response.

        // For each ingredient in the array...
        for (var i = 0; i < ingredients.length; i++) {

            // Create a string which is built from the ingredient amount, ingredient unit, and ingredient name.
            var currentIng = ingredients[i].amount.us.value + " " + ingredients[i].amount.us.unit + " " + ingredients[i].name;

            // Push the ingredient to the recipe JSON.
            theJSON.ingredients.push(currentIng);
        }

        callInstructions(theJSON, theId);
    });
}

// callInstructions calls the spoonacular analyzedInstructionsAPI, which retrieves the steps of a recipe.
// It adds the steps to the temporary recipe JSON and pushes the complete JSON to sessionStorage.
function callInstructions(theJSON, theId) {

    var instQueryURL = "https://api.spoonacular.com/recipes/" + theId + "/analyzedInstructions?apiKey=" + apiKey;

    $.ajax({
        url: instQueryURL,
        method: "GET",
    }).then(function (response) {

        var recipeInstructions = response[0].steps; // Get the instructions array from the response.

        // For each instruction in the array...
        for (var i = 0; i < recipeInstructions.length; i++) {

            // // Get the instruction number and the step.
            var instStep = recipeInstructions[i].step;

            // Push the step to the recipe JSON.
            theJSON.instructions.push(instStep);
        }

        // Add the recipe JSON to session storage.
        sessionStorage.setItem(theId, JSON.stringify(theJSON));

        displayDeckRecipe(theId);
    });
}

// When a search result is clicked, display its corresponding recipe ingredients and instructions.
$(document).on("click", ".search-result", getRecipeAndDisplay);
