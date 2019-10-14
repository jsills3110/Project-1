var groupList = [];
var groupOfRecipies = [];
var groupOfRecipieTitle = [];
var currentRecipeID;
var currentRecipeTitle;
var groupItem;


var groupingsOfRecipies = {};

//creating groups functionality
//this is what happens when you click on create group button
$("#create-group-button").on("click", function(){
    groupItem = $("#create-group-textBox").val().trim();
    // var groupItemDiv = "<div id ='group-item' ondrop='drop(event)' ondragover='allowDrop(event)'><button>"
    var groupItemDiv = "<div class = 'group-item'><button class = 'group-item-button'>"
    var groupItemClosingDiv = "</button></div><br>"


    groupingsOfRecipies[groupItem] = [];
    console.log(groupingsOfRecipies);
    groupList.push(groupItem);
    localStorage.setItem("groupList", groupList);
    $("#group-items-list").append(groupItemDiv + groupItem + groupItemClosingDiv);
   createList();
})

//creates list button; which lists all the groups
function createListButton(){
   var dropDownGroupButtonOpenDiv = "<button class='btn btn-secondary btn-block dropdown-toggle recipe-group-button' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
   var buttonDropDownName = "Add Recipe to Group";
   var dropDownGroupButtonCloseDiv = "</button>";
   var dropDownListOpenDiv = "<div id = 'groupList' class='dropdown-menu' aria-labelledby='dropdownMenuButton'>";
   var dropDownListCloseDiv = "</div>"
   $("#listButtons").append(dropDownGroupButtonOpenDiv + buttonDropDownName + dropDownGroupButtonCloseDiv + dropDownListOpenDiv + dropDownListCloseDiv);
   if(groupList.length != 0){
    createList();
   }
}
//creates the lists of groups
function createList(){
  $("#groupList").empty();
  for (i=0;i<groupList.length; i++){
    var listOpenDiv = "<a class='dropdown-item group-list-button' href='#'>"
    var listText = groupList[i];
    var listCloseDiv = "</a>";
    $("#groupList").append(listOpenDiv + listText + listCloseDiv);
  }
  
}

$(document).on("click", ".group-list-button", function(){
  currentRecipeID = $("#add-to-deck").attr("recipe-id");
  groupOfRecipies.push(currentRecipeID);
  tempJSON = JSON.parse(sessionStorage.getItem(currentRecipeID));
  currentRecipeTitle = tempJSON.title;
  groupOfRecipieTitle.push(currentRecipeTitle);

  for(i=0;i<groupList.length;i++){
    if(groupList[i] == this.text){
      groupingsOfRecipies[this.text].push(currentRecipeID);
    }
  }

})

$(document).on("click", ".group-item-button", function(){
  $("#deck-item-drop-div").empty();
  var buttonText = $(this).text();
   for(i=0; i<groupingsOfRecipies[buttonText].length; i++){
    currentRecipeTitle = JSON.parse(sessionStorage.getItem(groupingsOfRecipies[buttonText][i])).title;
    var tempRecipeID = groupingsOfRecipies[buttonText][i];
    var deckButtonDiv = $("<button>");
    deckButtonDiv.attr("type", "button");
    deckButtonDiv.addClass("btn btn-primary deck-item set-id inline");
    deckButtonDiv.attr("recipe-id", tempRecipeID);
    deckButtonDiv.text(currentRecipeTitle);
    $("#deck-item-drop-div").append(deckButtonDiv)
  }

})

$(document).on("click", ".group-deck-item", function(){
  displayRecipe();
})
$(document).on("click", ".set-id", function(){
    id = $(this).attr("recipe-id");
})





//drag and drop functionality - future feature
function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var documentData = document.getElementById(data);
    var stringVer = documentData.outerHTML;
    debugger;
    database.ref().update({
    data: stringVer
    })
    console.log(documentData);
    console.log(stringVer);
    ev.target.appendChild(document.getElementById(data));
}