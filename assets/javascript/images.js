var images = $(".search-results");
var imageResult = [];
$("#submit").on("click", function (event) {
    event.preventDefault();
    images = [];

    var searchQuery = $("#search-text").val().trim();
    var queryURL = "https://pixabay.com/api/?type=photo=true&apiKey=" + apiKey;

    search(queryURL);
    function search(theURL) {
        $.ajax({
            url: theURL,
            method: "GET",
        }).then(function (response) {
            appendSearchResults(response.imageResult);
        });
    }

});
