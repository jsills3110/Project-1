var firebaseConfig = {
    apiKey: "AIzaSyDEgX56QY2lh2XZbC5lpjcTtLDFwvECD8w",
    authDomain: "whats-cooking-39dc2.firebaseapp.com",
    databaseURL: "https://whats-cooking-39dc2.firebaseio.com",
    projectId: "whats-cooking-39dc2",
    storageBucket: "whats-cooking-39dc2.appspot.com",
    messagingSenderId: "972886469154",
    appId: "1:972886469154:web:6801093a264ce15181b87b"
  };
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

