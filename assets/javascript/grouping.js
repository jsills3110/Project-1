var config = {
  apiKey: "AIzaSyBOeyfolSEBghtCgX8D6xgrq3Gj8J4wSyo",
  authDomain: "grouping-persistent-data.firebaseapp.com",
  databaseURL: "https://grouping-persistent-data.firebaseio.com",
  projectId: "grouping-persistent-data",
  storageBucket: "grouping-persistent-data.appspot.com",
  messagingSenderId: "702782983306",
  appId: "1:702782983306:web:48eac313f0274bb2ac7173"
};
    
firebase.initializeApp(config);
var database = firebase.database();
var groupList = [];
var groupOfRecipies = [];

//creating groups functionality
//this is what happens when you click on create group button
$("#create-group-button").on("click", function(){
    var groupItem = $("#create-group-textBox").val().trim();
    var groupItemDiv = "<div id ='group-item' ondrop='drop(event)' ondragover='allowDrop(event)'><button>"
    var groupItemClosingDiv = "</button></div><br>"
    groupList.push(groupItem);
    $("#group-items-list").prepend(groupItemDiv + groupItem + groupItemClosingDiv);
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
    var listOpenDiv = "<a class='dropdown-item group-list-button' href='#'>"
    var listText = groupList[groupList.length - 1];
    var listCloseDiv = "</a>";
    $("#groupList").append(listOpenDiv + listText + listCloseDiv);
}

$(document).on("click", ".recipe-group-button", function(){
    group
})
$(document).on("click",".group-list-button", function(){
    // groupOfRecipies.push(this);
    // console.log(groupOfRecipies);
    // var temp = localStorage.getItem(173997)
    // console.log(temp);

})

//drag and drop functionality
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