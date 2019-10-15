// *************************************************************
//
// Author(s): Dima Dibb
// Date: 10/14/2019
// 
// login.js when user try to sign up 
// they provide email and password to sign up
// and data is stored in firebase.
// *************************************************************

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
var database = firebase.database();

// When the user clicks on the "sign up" button...
$("#submit").on("click", function (event) {

    // prevent form submit 
    event.preventDefault();

    // read the user email
    var email = $("#email-text-signup").val().trim();
    // read the user password
    var password = $("#password-text-signup").val().trim();
    
    //log email
    console.log(email);
    
    //store the data in firebase in the users path
    database.ref("users").push({
       email: email,
        password: password
      });
});
