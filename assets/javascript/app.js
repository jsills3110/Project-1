var apiKey = "0354a464611c4f98ae415af555bb745e";
var apiID = "a54a71fd";
function search(ingredients) {
   var queryURL = "https://api.edamam.com/search?app_id=" + apiID + "&app_key=" + apiKey + "&q=" + ingredients;
   $.ajax({
       url: queryURL,
       method: "GET",
   }).then(function (response) {
       console.log(response.hits)
   });
}
search("tomato");

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    buttonPush();
});