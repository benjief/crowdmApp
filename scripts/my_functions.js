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

/***************** copy function which doesn't work *****************/
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}