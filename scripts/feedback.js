// JS for feedback.html

// Set up a flags to check if the users submission is valid
var noStoreSelected;
var noRating;

var store;

// Get store selected from dropdown menu 
function getSelectedStore(floatingSelect) {
    var selectedStore = floatingSelect.value;
    store = "Costco_" + selectedStore;
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
function getRating(starRating) {
    rating = starRating.value;
}

// Make sure a store has been selected
function checkSelection() {
    if (!store || store === "Costco_invalid") {
        feedback.innerHTML = "Please select a valid Costco location"
        $(feedback).css({
            color: "red"
        });
        $(feedback).show(0);
        $(feedback).fadeOut(2500);
        noStoreSelected = true;
        console.log("Review not submitted - no store selected.");
    } else {
        noStoreSelected = false;
    }
}

// Make sure a rating has been given
function checkRating() {
    if (!rating) {
        feedback.innerHTML = "Please rate your experience"
        $(feedback).css({
            color: "red"
        });
        $(feedback).show(0);
        $(feedback).fadeOut(2500);
        noRating = true;
        console.log("Review not submitted - no rating.");
    } else {
        noRating = false;
    }
}

// Add a review to Firestore; only the most up-to-date review is stored
function addReview(store) {
    db.collection("Stores").doc(store).collection("Reviews").doc(firebase.auth().currentUser.displayName).set({
        id: firebase.auth().currentUser.displayName,
        Reviewer_Name: firebase.auth().currentUser.displayName,
        Reviewer_Email: firebase.auth().currentUser.email,
        Reviewer_Rating: parseInt(rating),
        Reviewer_Comment: document.getElementById("comment_box").value,
        Date_Time: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

// Deal with submission click in the appropriate manner
function onClickSubmit() {
    // Grab comment
    console.log(document.getElementById("comment_box").value);
    var feedback = document.getElementById("feedback");
    checkSelection();
    if (!noStoreSelected) {
        checkRating();
    }
    // Add or modify a review if selections are valid
    if (!noStoreSelected && !noRating) {
        addReview(store);
        // Display success message and direct users back to the main page
        document.getElementById("feedback").innerHTML = "Thanks for your feedback!";
        $(feedback).css({
            color: "green"
        });
        $(feedback).show(0);
        $(feedback).fadeOut(2500);
        setTimeout(function () { 
            location.href = "/web/member/main.html"}, 2300);
    }
}
