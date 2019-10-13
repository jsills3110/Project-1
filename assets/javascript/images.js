
function displayRecipeImage(recipeName){
    var queryURL = "https://pixabay.com/api/?key="+pixabayApiKey+ "&q="+recipeName+"&type=photo&pretty=true";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

    });
}


