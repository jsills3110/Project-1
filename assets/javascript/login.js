// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();

//   var ui = new firebaseui.auth.AuthUI(firebase.auth());
const auth = firebase.auth();
//   const db = firebase.firestore();

//listen for auth status changes
auth.onAuthStateChanged(user=>{
    if(user){
        $("#logout").attr("hidden", false);
        $("#login-toggle").attr("hidden", true);
        console.log('user logged in: ', user);
        console.log(user.uid);
       
        $("#create-group-button").on("click", function(){
            var tempGroupName = $("#create-group-textBox").val().trim();
            var tempArray = "HELLO";
            console.log(tempGroupName);
            database.ref().push({
                userEmail: user.email,
                group: tempGroupName
            })
        })
        $(document).on("click", ".group-list-button", function(){
            currentRecipeID = $("#add-to-deck").attr("recipe-id");
            database.ref().push({
                recipe: currentRecipeID
            })
          
        })

    }
    else{
        console.log('user logged out')
        $("#logout").attr("hidden", true);
        $("#login-toggle").attr("hidden", false);
    }
})

//sign up
  $("#signup").on("click", function(){
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    console.log(email, password);
    console.log("????");
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
   
     })
     auth.onAuthStateChanged(user=>{
        database.ref().push({
            userEmail: user.email
        })

     })
    
  })

//logout
  $("#logout").on("click", function(){
      auth.signOut().then(()=>{
         
      });
  })

//login
$("#login").on("click", function(){
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
       
    })
})


// // *************************************************************
// //
// // Author(s): Dima Dibb
// // Date: 10/14/2019
// // 
// // login.js when user try to sign up 
// // they provide email and password to sign up
// // and data is stored in firebase.
// // *************************************************************

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // initialize database
// var database = firebase.database();

// // When the user clicks on the "sign up" button...
// $("#submit").on("click", function (event) {

//     // prevent form submit 
//     event.preventDefault();

//     // read the user email
//     var email = $("#email-text-signup").val().trim();
//     // read the user password
//     var password = $("#password-text-signup").val().trim();
    
//     //log email
//     console.log(email);
    
//     //store the data in firebase in the users path
//     database.ref("users").push({
//        email: email,
//         password: password
//       });
// });
