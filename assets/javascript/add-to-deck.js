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
    console.log(recipe);
$(".ing-and-buttons").text(sessionStorage.getItem(ingredients));
$(".recipe-instructions").text(sessionStorage.getItem(recipe));
displayRecipe(id);
};

function displayRecipe(recipeIdNumber){
    var recipeItem = JSON.parse(sessionStorage.getItem(recipeIdNumber));
    var ing = recipeItem.ingredients;
    var instr = recipeItem.instructions;
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
    addToDeckButton.addClass("btn btn-outline-success mr-2 my-sm-2 btn-block");
    addToDeckButton.attr("recipe-id", id);
    addToDeckButton.attr("id", "add-to-deck");
    addToDeckButton.text("Add to Deck");

    listButtons.append(addToDeckButton);

    buttonColumn.append(listButtons);

     // Add the "edit" button.
     var editButton = $("<button>");
     editButton.addClass("btn btn-outline-success mr-2 my-sm-2 btn-block");
     editButton.attr("recipe-id", recipeId);
     editButton.attr("id", "edit-recipe");
     editButton.text("Edit Recipe");
 
     listButtons.append(editButton);
 
     buttonColumn.append(listButtons);

    // build h3 label
    var labelH3 = $("<h3>");
    labelH3.text("Ingredients");
    ingrColumn.append(labelH3);

    // Add the ingredients to the container, which in turn calls callInstructions(), which adds
    for(i = 0; i < ing.length; i++){
        var ingredientLi = $("<li>");
        ingredientLi.addClass("list-style");
        ingrColumn.append(ingredientLi);
        ingredientLi.append(ing[i]);
        console.log(ing[i]);
    };   
    // the instructions to the container.
    // callIngredients(recipeJSON, recipeId, ingrColumn, instColumn);

    // Add the ingredient and button columns to the ingAndButtonsRow and 
    // add the instructions column to the recipeInstRow.
    ingAndButtonsRow.append(ingrColumn);
    ingAndButtonsRow.append(buttonColumn);
    recipeInstRow.append(instColumn);
    
    for(i = 0; i < instr.length; i++){
        var instructionLi = $("<li>");
        instructionLi.addClass("list-style")
        instColumn.append(instructionLi);
        instructionLi.append(i+1 + " " + instr[i]);
        console.log(instr[i]);
    };  
    createListButton(); 
};
        

$(document).on("click", "#add-to-deck", deckButton);
$(document).on("click", ".deck-item", buttonDisplay);