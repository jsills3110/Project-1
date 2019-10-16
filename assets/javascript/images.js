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
    var queryURL = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrApiKey + "&text=" + recipeName + "&format=json&nojsoncallback=1";
    // call ajax to have an image:
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // log the response
        console.log(response);
        // call display image
        displayImage(response);

    });
}
// create img element from flickr response  
function displayImage(flickrResponse) {
    // get array length
    var length = flickrResponse.photos.photo.length;

    // if there's more than 5 images, show 5 only
    if (length > 5) {
        length = 5;
    }

    // loop over all the photo in the response
    for (var i = 0; i < length; i++) {
        // create a var for the photo
        var photo = flickrResponse.photos.photo[i];
        // create img url
        var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
        // create img element
        var image = $("<img>");
        // add img style
        image.addClass("recipe-img");
        // set the img src to the flickr url
        image.attr("src", url);
        // add the img to place holder div 
        $("#image-div").append(image);
    }
}


