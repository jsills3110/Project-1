
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();


  //   var ui = new firebaseui.auth.AuthUI(firebase.auth());
  
  const auth = firebase.auth();
//   const db = firebase.firestore();

//listen for auth status changes
auth.onAuthStateChanged(user=>{
    if(user){
        console.log('user logged in: ', user)

    }
    else{
        console.log('user logged out')
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
$("#test").on("click", function(event){
    event.preventDefault();
    console.log("HELLO?")
    database.ref().set({
        name: "BLAH",
        email: "BLAH"
    })
    database.ref().on("value", function(snapshot){
        console.log(snapshot)

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
