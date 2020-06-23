var databaseRef = firebase.database().ref().child("Blogs");
        databaseRef.once("value").then(function(snapshot){
            var name = picture['name'];
            var dataStr = Date().getTime();
            var fileCompleteName = name + "_" + dataStr;

            var storageRef = firebase.storage().ref("Blog Images");
            var blogStorageRef = storageRef.child(fileCompleteName);

            var uploadTask = blogStorageRef.put(picture);

            uploadTask.on(
                "state_changed",
                function complete(){
                    var user = firebase.auth().currentUser;
                    var userName;
                    firebase.database().ref('Users/' + user.uid).once('value').then(function(snapshot){
                        var fName = (snapshot.val() && snapshot.val().firstname);
                        var lName = (snapshot.val() && snapshot.val().lastname);

                        userName = fName + " " + lName;
                    });

                    uploadTask.snapshot.ref.getDownloadURL().then(function(){
                        var time = new Date();

                        var options = {
                            weekday: "long",
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        };

                        var blogData = {
                            "image": downloadURL,
                            "uid": user.uid,
                            "time": time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12:true}),
                            "date": time.toLocaleDateString('en-US', options),
                            
                        };

                        var newPostRef = database.push();

                        newPostRef.set(blogData, function(err){
                            if(err){
                                $("#main").attr("class","alert alert-danger");
                                $("#main").html(err.message);
                            }else{
                                $("#main").attr("class","alert alert-success");
                                $("#main").html("blog has been uploaded successfully.");
                                window.open("", "_self");
                            }
                        });
                    });
                }
            );
        });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        var database = firebase.database();
                var storage = firebase.storage();

                var imgPro = document.getElementById("imgPro");
                var main = document.getElementById("main");
                var bildeurler = database.ref("bildeurler");

                function lagreURL(snap){
                    var url = snap.downloadURL;
                    bildeurler.push(url);
                }
                function lastOppBilde() {
                    var bilde = this.files[0];
                    var bildenavn = storage.ref("imgPro/" + new Date());
                    bildenavn.put(bilde).then(lagreURL);
                }

                imgPro.onchange = lastOppBilde;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // var firebaseConfig = {
        //     apiKey: "AIzaSyBXtA2h5hlz600klyOHDW61qcinVIlX5xI",
        //     authDomain: "alotjobs-5f2c3.firebaseapp.com",
        //     databaseURL: "https://alotjobs-5f2c3.firebaseio.com",
        //     projectId: "alotjobs-5f2c3",
        //     storageBucket: "alotjobs-5f2c3.appspot.com",
        //     messagingSenderId: "980309555700",
        //     appId: "1:980309555700:web:0195af85e20f64d0b521a1",
        //     measurementId: "G-4MJ7J6DF26"
        // };
        // // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);

        // firebase.auth.Auth.Persistence.LOCAL;

        $("#imgPro").on("change", function (event) {
            selectedFile = event.target.files[0];
        });
        function uploadFile() {
            // var selectedFile = this.files[0];
            // Create a root reference
            var filename = selectedFile.name;
            var storageRef = firebase.storage().ref('/imagePro/' + filename);

            // Upload the file and metadata
            var uploadTask = storageRef.put(selectedFile);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // See below for more detail
            }, function (error) {
                // Handle unsuccessful uploads
            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                var postKey = firebase.database().ref("Posts").push().key;
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    var updates = {};
                    var postData = {
                        url: downloadURL
                    };
                    updates['/Posrs/' + postKey] = postData;
                    firebase.database().ref().update(updates);
                    console.log(downloadURL);
                });
            });
        }                