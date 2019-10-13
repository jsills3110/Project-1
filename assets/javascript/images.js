
function displayRecipeImage(recipeName){
    var queryURL = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key="+flickrApiKey+"&text="+recipeName+"&format=json&nojsoncallback=1";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

    });
}


