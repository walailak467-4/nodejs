var firebaseConfig = {
    apiKey: "AIzaSyBXtA2h5hlz600klyOHDW61qcinVIlX5xI",
    authDomain: "alotjobs-5f2c3.firebaseapp.com",
    databaseURL: "https://alotjobs-5f2c3.firebaseio.com",
    projectId: "alotjobs-5f2c3",
    storageBucket: "alotjobs-5f2c3.appspot.com",
    messagingSenderId: "980309555700",
    appId: "1:980309555700:web:0195af85e20f64d0b521a1",
    measurementId: "G-4MJ7J6DF26"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;

$("#btn-login").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);

        result.catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage)
        });
    } else {
        window.alert("Form is incomplete. Pleas fill out all fields.")
    }
});


$("#btn-signup").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();
    var cPassword = $("#confirmPassword").val();


    if (email != "" && password != "" && cPassword != "") {
        if (password == cPassword) {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);

            result.catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage)
            });
        } else {
            window.alert("Password do not match with the Confirm Password.")
        }
    } else {
        window.alert("Form is incomplete. Pleas fill out all fields.")
    }
});

$("#btn-resetPassword").click(function () {
    var auth = firebase.auth();
    var email = $("#email").val();

    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function () {
            window.alert("Email has been sent to you, Please check and verify")
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage)
        });
    } else {
        window.alert("Please write your email first.")
    }
});

$("#btn-logout").click(function () {
    firebase.auth().signOut();
});

$("#btn-proJOB").click(function () {
    var imgPro = $("#imgPro").val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var nickname = $("#nickname").val();
    var birthdate = $("#birthdate").val();
    var gender = $("#gender").val();
    var phone = $("#phone").val();
    var email = $("#email").val();

    var rootRef = firebase.database().ref().child("Users/UserJOB");
    var userID = firebase.auth().currentUser.uid;
    var userRef = rootRef.child(userID);

    if (imgPro != "" && firstname != "" && lastname != "" && nickname != "" && birthdate != "" && gender != "" && phone != "" && email != "") {
        var userData = {
            "imgPro": imgPro,
            "firstname": firstname,
            "lastname": lastname,
            "nickname": nickname,
            "birthdate": birthdate,
            "gender": gender,
            "phone": phone,
            "email": email
        };
        userRef.set(userData, function(error){
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
    
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            }else{
                window.location.href = "MainPage.html"
            }
        })
    } else {
        window.alert("Form is incomplete. Pleas fill out all fields.")
    
    }
});


$("#btn-proEmployee").click(function () {
    var imgPro = $("#imgPro").val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var company = $("#company").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var knowUs = $("#knowUs").val();

    var rootRef = firebase.database().ref().child("Users/UserEmplooyee");
    var userID = firebase.auth().currentUser.uid;
    var userRef = rootRef.child(userID);

    if (imgPro != "" && firstname != "" && lastname != "" && company != "" && phone != "" && email != "" && knowUs != "") {
        var userData = {
            "imgPro": imgPro,
            "firstname": firstname,
            "lastname": lastname,
            "company": company,
            "phone": phone,
            "email": email,
            "knowUs": knowUs
        };


        userRef.set(userData, function (error) {
            if (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            } else {
                window.location.href = "MainPage.html"
            }
        })
    } else {
        window.alert("Form is incomplete. Pleas fill out all fields.")

    }
});

