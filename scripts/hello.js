// JS for personalized greetings (main.html, feedback.html)

/* Get the current user's name from Firestore and use it to create personalized greetings
   on main.html (for all users) and feedback.html (for members) */
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("Users")
                .doc(somebody.uid)
                // Read
                .get()
                .then(function (doc) {
                    // Extract the first name of the user
                    var name = doc.data().Name.split(" ", 1);
                    if (name) {
                        $(".name-goes-here").html(name);
                        $(".greeting-goes-here").html(name + ", please give us your feedback!");
                      // Display a generic message if no name is entered when signing up
                    } else {
                        $(".name-goes-here").html(" Costco member!");
                        $(".greeting-goes-here").html("Please give us your feedback!");
                    }
                });
        }
    });
}
sayHello();
