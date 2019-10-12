var id;
var ingredients;
var ingAndButtonsRow = $("#ing-and-buttons"); // Find the ing-and-buttons row. 
var recipeInstRow = $("#recipe-instructions"); // Find the recipe-instructions row.
function deckButton() {
    var addButton = $("<button>");
    addButton.attr("type", "button");
    addButton.addClass("btn btn-primary deck-item inline");
    addButton.text("New Button");
    $("#deck-item-drop-div").append(addButton);
    id = $(this).attr("recipe-id");
    ingredients = $(this).attr("recipe-id");
    

};

function buttonDisplay(){
    var recipe = JSON.parse(sessionStorage.getItem(id));
    // var recipe = JSON.parse(sessionStorage.getItem(id));
    // console.log(recipe);
$(".ing-and-buttons").text(sessionStorage.getItem(ingredients));
$(".recipe-instructions").text(sessionStorage.getItem(recipe));
displayRecipe(id);
};

function displayRecipe(recipeIdNumber){
    var recipeItem = JSON.parse(sessionStorage.getItem(recipeIdNumber));
    var ing = recipeItem.ingredients;
    // var ingredients = [];
    console.log(ing[0]);
   // Display the ingredients and instructions when the recipe is clicked.
    ingAndButtonsRow.empty();
    recipeInstRow.empty();

    // Create a new column for ingredients.
    var ingrColumn = $("<div class='col-8' id='ingredients'>");

    // Create a new column for buttons.
    var buttonColumn = $("<div class='col' id='recipe-buttons'>");

    // Create a new column for the instructions.
    var instColumn = $("<div class='col' id='instructions'>");

    // Add required listButtons div to the buttonColumn.
    var listButtons = $("<div id='listButtons'>");

    // Add the "add to deck" button.
    var addToDeckButton = $("<button>");
    addToDeckButton.addClass("btn btn-outline-success mr-2 my-sm-2");
    addToDeckButton.attr("recipe-id", id);
    addToDeckButton.attr("id", "add-to-deck");
    addToDeckButton.text("Add to Deck");

    listButtons.append(addToDeckButton);

    buttonColumn.append(listButtons);

    // build h3 label
    var labelH3 = $("<h3>");
    labelH3.text("Ingredients");
    ingrColumn.append(labelH3);

    // Add the ingredients to the container, which in turn calls callInstructions(), which adds
    // the instructions to the container.
    // callIngredients(recipeJSON, recipeId, ingrColumn, instColumn);

    // Add the ingredient and button columns to the ingAndButtonsRow and 
    // add the instructions column to the recipeInstRow.
    ingAndButtonsRow.append(ingrColumn);
    ingAndButtonsRow.append(buttonColumn);
    recipeInstRow.append(instColumn);
    // for(var i = 0; i < ingredientArrItem.length; i++){}
    
    $("#recipe-instructions").html()
};

// var ingredients = response.ingredients; // Get the ingredients array from the response.

//         // For each ingredient in the array...
//         for (var i = 0; i < ingredients.length; i++) {
//             var ingredientLi = $("<li>");

//             // Create a string which is built from the ingredient amount, ingredient unit, and ingredient name.
//             var currentIng = ingredients[i].amount.us.value + " " + ingredients[i].amount.us.unit + " " + ingredients[i].name;

//             // Push the ingredient to the recipe JSON.
//             theJSON.ingredients.push(currentIng);

//             // Add the ingredient to the ingredient list.
//             ingredientLi.text(currentIng);
//             ingredientsUl.append(ingredientLi);
//         }

//         // Append the ingredients list to the container div.
//         theIngColumn.append(ingredientsUl);

    // <button type="button" class="btn btn-primary deck-item inline" draggable="true" ondragstart="drag(event)"
    //     id="drag1"><img class="img-fluid" width="90rem" src="assets/images/2ChocolateChipCookies.jpg">
    //         2ChocolateChipCookies </button>
    //         };
        

$(document).on("click", "#add-to-deck", deckButton);
$(document).on("click", ".deck-item", buttonDisplay);