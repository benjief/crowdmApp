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
                    $(".name-goes-here").html(" " + name);
                });
        }
    });
}
sayHello();
