/***************** reviews *****************/

// Create empty array to store all reviews pulled from Firestore
var masterArray = [];
// Default number of reviews posted upon page loading
var defaultReviewsPosted = 3;

function pageSetUp(store) {
    // Add store name to top of page
    var heading = "<p id='heading'></p>";
    $(".heading-container").append(heading);
    $("#heading").html("Costco " + store);
    // Add image to top of page
    var storeImage = "<img src='/images/store_" + store.toLowerCase() + "_storefront.png' alt='storefront'>"
    $(".container").append(storeImage);
}

// Add JSON object to master array containing all reviews
function addToMasterArray(reviewInfo) {
    masterArray.push(reviewInfo);
}

// Add reviews to the DOM
function postReviews(start, end) {
    for (var i = start; i < end; i++) {
        var review = "<p class='review' id='review-" + i.toString()
            + "'></p>";
        $(".review-container").append(review);
        $("#review-" + i.toString()).html("<span>Name: </span>" + masterArray[i]["name"] + "<br/>"
            + "<span>Rating: </span>" + masterArray[i]["rating"] + "<br/>"
            + "<span>Comments: </span>" + masterArray[i]["comment"]);
    }
}

// Read review data from Firestore and write it to the screen
function getReviews(store) {
    db.collection("Stores").doc("Costco_" + store).collection("Reviews")
        .onSnapshot((querySnapshot) => {
            // Get information for each review and push to the ratings array
            querySnapshot.forEach((doc) => {
                var name = doc.data().Reviewer_Name;
                var rating = doc.data().Reviewer_Rating;
                var comment = doc.data().Reviewer_Comment;
                // Create JSON object to house review information
                var reviewInfo = { "name": name, "rating": rating, "comment": comment };
                addToMasterArray(reviewInfo);
            });
            console.log(masterArray);
            postReviews(0, defaultReviewsPosted);
        });
}

function loadAllReviews() {
    postReviews(defaultReviewsPosted, masterArray.length)
    $("#load-more-button").css({ display: "none" });
}

// Get, update and post average ratings for all stores
function updateRating(store) {
    db.collection("Stores").doc("Costco_" + store).collection("Reviews")
        .onSnapshot((querySnapshot) => {
            store = store.toLowerCase();
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Rating);
            });
            var sum = 0;
            for (var j = 0; j < ratings.length; j++) {
                sum += ratings[j];
            }
            var avgRating = sum / ratings.length;
            document.getElementById("stars").setAttribute("style", "--rating: " + avgRating
                .toFixed(1).toString() + ";");
            document.getElementById("current-rating").innerHTML = "Current rating: " + avgRating
                .toFixed(1);
        });
}

// Call functions
$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    var store = parsedUrl.searchParams.get("store");
    pageSetUp(store);
    getReviews(store);
    updateRating(store);
});
