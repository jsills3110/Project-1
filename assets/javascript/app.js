function search(ingredients) {
    var queryURL = "https://www.recipepuppy.com/api/?i=" + ingredients;
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://tasty.p.rapidapi.com/recipes/list?q=tomato&from=0&sizes=10",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key": "39adb33b70msh3079c712993c8e5p1ef5e4jsn36d6fb0973f1"
        }
    }).then(function (response) {
            console.log(response)
        });
}
search("tomato");