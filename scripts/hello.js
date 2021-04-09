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
                        $(".name-goes-here").html("&nbsp;"+ name);
                      // Display a generic message if no name is entered when signing up
                    } else {
                        $(".name-goes-here").html(" Costco member!");
                    }
                });
        }
    });
}
sayHello();
