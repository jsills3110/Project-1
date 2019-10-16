// *************************************************************
//
// Author(s): Dima Dibb
// Date: 10/13/2019
// 
// images.js when user select a recipe images
// make an API call to flickr search API 
//and display related  images .
// *************************************************************


// display images related to a recipes 
function displayRecipeImage(recipeName) {
    // flikr search url:
    var queryURL = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrApiKey + "&text=" + recipeName + "&per_page=1&format=json&nojsoncallback=1";
    // call ajax to have an image:
    
    // var queryURL = "https://spoonacular.com/recipeImages/209960.jpg"
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
   
        $("#image-div").empty();
        for(i=0; i<response.photos.photo.length;i++){
            var photo = response.photos.photo[i];
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
            var imageDiv = $("<img>");
                imageDiv.css("max-width", "400px");
                imageDiv.attr("src", url);
                imageDiv.attr("class", "rounded float-right");

            $("#image-div").append(imageDiv);
        }

    })
}


$(document).on("click", ".search-result", function(){
   displayRecipeImage($(this).text())
   console.log($(this).text());
})

