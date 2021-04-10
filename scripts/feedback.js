// Get store selected from dropdown menu 
var selectedStore;

function getSelectedStore(floatingSelect) {
    selectedStore = floatingSelect.value;
}

// Implement a character limit counter
function textCounter(field, field2, maxlimit) {
    var countfield = document.getElementById(field2);
    if (field.value.length > maxlimit) {
        field.value = field.value.substring(0, maxlimit);
        return false;
    } else {
        countfield.value = maxlimit - field.value.length;
    }
}

// Star rating bar
$(function () {
    $('#star-rating').barrating({
        theme: 'fontawesome-stars'
    });
});

// Record rating
var rating;

function getRating(star_rating) {
    rating = star_rating.value;
}

// Write review to database
// Add a new document in collection "cities"
function onClickSubmit() {
    // Grab comment
    console.log(document.getElementById("comment_box").value);
    // Get correct store name (in DB format)
    var storeToUpdate = "Costco_" + selectedStore;
    var feedback = document.getElementById("feedback");
    // Make sure a store has been selected
    if (!selectedStore || selectedStore === "invalid") {
        feedback.innerHTML = "Please select a valid Costco location"
        $(feedback).css({
            color: "red"
        });
        $(feedback).show(0);
        $(feedback).fadeOut(2500);
        // Make sure a rating has been given
    } else if (!rating) {
        feedback.innerHTML = "Please rate your experience"
        $(feedback).css({
            color: "red"
        });
        $(feedback).show(0);
        $(feedback).fadeOut(2500);
    } else {
        document.getElementById("feedback").innerHTML = "Thanks for your feedback!";
        $(feedback).css({
            color: "black"
        });
        $(feedback).show(0);
        $(feedback).fadeOut(2500);
        db.collection("Stores").doc(storeToUpdate).collection("Reviews").add({
            Reviewer_Name: firebase.auth().currentUser.displayName,
            Reviewer_Email: firebase.auth().currentUser.email,
            Reviewer_Rating: parseInt(rating),
            Reviewer_Comment: document.getElementById("comment_box").value,
            Date_Time: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}