
function deckButton() {
    var addButton = $("<button>");
    addButton.attr("type", "button");
    addButton.addClass("btn btn-primary deck-item inline");
    addButton.text("New Button");
    $("#deck-item-drop-div").append(addButton);
    console.log(sessionStorage.getItem("spoonId"));
};

function buttonDisplay(){
$(".main-content").text(sessionStorage.getItem("spoonId"));
};

    // <button type="button" class="btn btn-primary deck-item inline" draggable="true" ondragstart="drag(event)"
    //     id="drag1"><img class="img-fluid" width="90rem" src="assets/images/2ChocolateChipCookies.jpg">
    //         2ChocolateChipCookies </button>
    //         };
        

$(document).on("click", ".search-result", deckButton);