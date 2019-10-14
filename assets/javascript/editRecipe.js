// *************************************************************
//
// Author(s): Jessica Sills
// Date: 10/12/2019
// 
// editRecipe allows a user to edit a recipe's title, 
// ingredients, and instructions. It then saves the recipe to 
// the session storage/database.
//
// *************************************************************

var recipeId;
var recipe;
var ingAndButtonsRow = $("#ing-and-buttons"); // Find the ing-and-buttons row. 
var recipeInstRow = $("#recipe-instructions"); // Find the recipe-instructions row.

// When the Edit Recipe button is clicked, convert the recipe into an editable version of itself.
$(document).on("click", "#edit-recipe", function () {
    recipeId = $(this).attr("recipe-id");
    recipe = JSON.parse(sessionStorage.getItem(recipeId));
    createForm();
});

// Create the form that allows the user to edit a recipe.
function createForm() {
    ingAndButtonsRow.empty(); // Empty the ingredients and button row
    recipeInstRow.empty(); // Empty the recipe instructions row
    var ingredients = recipe.ingredients; // Grab the ingredients from the stored recipe
    var instructions = recipe.instructions; // Grab the instructions from the stored recipe
    
    // Create a new form for the recipe.
    var recipeForm = $("<form id='recipe-editor' data-recipeid='" + recipeId + "' style='width: 100%'>");
    recipeForm.attr("data-ingrs", ingredients.length); // Store the number of ingredients for later use
    recipeForm.attr("data-steps", instructions.length); // Store the number of instructions for later use

    // Create a bootstrap form-group for the title of the recipe and add it to the recipe form.
    var formGroup = $("<div class='form-group'>");
    var recipeInput = $("<input type='text' class='form-control'>");
    recipeInput.attr("id", "title");
    recipeInput.val(recipe.title);
    formGroup.append(recipeInput);
    recipeForm.append(formGroup)

    // For each ingredient in the recipe, create a bootstrap form-group text input for it and set the value
    // to the current ingredient text. Add the form-group to the recipe form.
    for (var i = 0; i < ingredients.length; i++) {
        var formGroup = $("<div class='form-group'>");
        var recipeInput = $("<input type='text' class='form-control'>");
        recipeInput.attr("id", "ingredient-" + i);
        recipeInput.val(ingredients[i]);
        formGroup.append(recipeInput);
        recipeForm.append(formGroup);
    }

    // For each instruction in the recipe, create a bootstrap form-group textarea for it and set the value
    // to the current instruction text.
    for (var i = 0; i < instructions.length; i++) {
        var formGroupRow = $("<div class='form-group row'>");
        var stepLabel = $("<label for='instruction-'" + i + "' class='col-sm-1 col-form-label my-2'>" + (i + 1) + "</label>");
        formGroupRow.append(stepLabel);
        var formGroupColumn = $("<div class='col-sm-11 my-2'>");
        var recipeInput = $("<textarea class='form-control' rows='3'>");
        recipeInput.attr("id", "instruction-" + i);
        recipeInput.val(instructions[i]);
        formGroupColumn.append(recipeInput);
        formGroupRow.append(formGroupColumn);
        recipeForm.append(formGroupRow);
    }

    // Create a submission button that allows the user to save their changes on the recipe.
    var submitButton = $("<button type='submit'>");
    submitButton.addClass("btn btn-outline-success mr-2 my-sm-2");
    submitButton.attr("id", "submit-edits");
    submitButton.text("Save Recipe");

    // Create a cancel button that allows the user to cancel the changes they made to the recipe.
    var cancelButton = $("<button>");
    cancelButton.addClass("btn btn-outline-danger mr-2 my-sm-2");
    cancelButton.attr("id", "cancel-edits");
    cancelButton.text("Cancel Edits");

    // Append the buttons and the recipe form to the document.
    ingAndButtonsRow.append(submitButton);
    ingAndButtonsRow.append(cancelButton);
    recipeInstRow.append(recipeForm);
}

// When the user clicks on the "Save Recipe" button...
$(document).on("click", "#submit-edits", function (event) {
    event.preventDefault();
    var editor = $("#recipe-editor"); // Grab the whole form
    recipeId = editor.attr("data-recipeid"); // Grab the Spoonacular recipe ID
    var numberOfIngrs = editor.attr("data-ingrs"); // Grab the number of ingredients
    var numberOfSteps = editor.attr("data-steps"); // Grab the number of instructions

    // Set up a new JSON object to store the changed recipe.
    var newJSON = {
        spoonId: "userId-" + recipeId,
        title: $("#title").val().trim(),
        ingredients: [],
        instructions: []
    }

    // Take the ingredients from the form and add them to the new JSON recipe.
    for (var i = 0; i < numberOfIngrs; i++) {
        var ingredient = $("#ingredient-" + i).val().trim();
        newJSON.ingredients.push(ingredient);
    }

    // Take the instructions from the form and add them to the new JSON recipe.
    for (var i = 0; i < numberOfSteps; i++) {
        var instruction = $("#instruction-" + i).val().trim();
        newJSON.instructions.push(instruction);
    }

    // Put the new JSON recipe in session storage.
    sessionStorage.setItem("userid-" + recipeId, JSON.stringify(newJSON));
});