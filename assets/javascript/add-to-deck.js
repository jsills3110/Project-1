
function deckButton() {
    var addButton = $("<button>");
    addButton.attr("type", "button");
    addButton.addClass("btn btn-primary deck-item inline");
    addButton.text("New Button");
    $("#deck-item-drop-div").append(addButton);
    console.log(sessionStorage.getItem("theId"));
};

function buttonDisplay(){
$(".ing-and-buttons").text(sessionStorage.getItem("theId"));
$(".recipe-instructions")
};

    // <button type="button" class="btn btn-primary deck-item inline" draggable="true" ondragstart="drag(event)"
    //     id="drag1"><img class="img-fluid" width="90rem" src="assets/images/2ChocolateChipCookies.jpg">
    //         2ChocolateChipCookies </button>
    //         };
        

$(document).on("click", "#add-to-deck", deckButton);