
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


$("#create-group-button").on("click", function(){
    var groupItem = $("#create-group-textBox").val().trim();
    $("#group-items-list").prepend("<li>" + groupItem + "</li>")
})



function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(document.getElementById(data));
    ev.target.appendChild(document.getElementById(data));
  }