function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            //console.log(somebody.uid);
            db.collection("Users")
                .doc(somebody.uid)
                .get() //READ
                .then(function (doc) {
                    console.log(doc.data().Name);
                    var n = doc.data().Name;
                    $(".name-goes-here").text(n);
                });
        }
    });
}
sayHello();
