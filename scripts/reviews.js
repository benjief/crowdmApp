/***************** reviews *****************/

// Create empty array to store all reviews pulled from Firestore
var masterArray = [];
// Default number of reviews posted upon page loading (<= 3)
var defaultReviewsPosted;

function pageSetUp(store) {
    // Add store name to top of page
    var heading = "<p class='page-heading'></p>";
    $(".heading-container").append(heading);
    $(".page-heading").html("Reviews: Costco " + store);
    // Add image to top of page
    var storeImage = "<img src='/images/store_" + store.toLowerCase() + "_storefront.png' alt='storefront'>"
    $("#main-content-card").append(storeImage);
}

// Add JSON object to master array containing all reviews
function addToMasterArray(reviewInfo) {
    masterArray.push(reviewInfo);
}

// Erase reviews from the DOM if they exist
function eraseInfoFromDom() {
    var reviewData = document.getElementsByClassName('review');
    while (reviewData[0]) {
        masterArray = [];
        reviewData[0].parentNode.removeChild(reviewData[0]);
    }
}

// Erase the "Load More" button from the DOM if it exists
function eraseButtonFromDom() {
    var button = document.getElementsByClassName('button-container');
    while (button[0]) {
        button[0].parentNode.removeChild(button[0]);
    }
}

// Add reviews to the DOM
function postReviews(start, end) {
    // Append a message if no reviews have been posted
    if (!masterArray[0]) {
        var i = 0;
        var review = "<div class='review' id='review-" + i.toString()
            + "'></div>";
        // Add reviewer name, rating, date and comment to each review
        $(".review-container").append(review);
        $("#review-" + i.toString()).append("<div class='review-name-rating-date' id='review-name-rating-date-" + i.toString() + "'></div>");
        $("#review-name-rating-date-" + i.toString()).append("<div class='review-name-rating' id='review-name-rating-" + i.toString() + "'></div>");
        $("#review-name-rating-" + i.toString()).append("<p id='reviewer-name'>No reviews have been posted!</p>");
    } else {
        for (var i = start; i < end; i++) {
            var review = "<div class='review' id='review-" + i.toString()
                + "'></div>";
            // Add reviewer name, rating, date and comment to each review
            $(".review-container").append(review);
            $("#review-" + i.toString()).append("<div class='review-name-rating-date' id='review-name-rating-date-" + i.toString() + "'></div>");
            $("#review-name-rating-date-" + i.toString()).append("<div class='review-name-rating' id='review-name-rating-" + i.toString() + "'></div>");
            $("#review-name-rating-" + i.toString()).append("<p id='reviewer-name'>" + masterArray[i]["name"] + "</p>");
            $("#review-name-rating-" + i.toString()).append("<div id='reviewer-rating' class='stars' style='--rating:" + masterArray[i]["rating"].toFixed(1).toString() + "'></div></div>");
            $("#review-name-rating-date-" + i.toString()).append("<p id='review-date'>" + masterArray[i]["date"] + "</p>");
            $("#review-" + i.toString()).append("<p id='reviewer-comment'>" + masterArray[i]["comment"] + "</p>");
        }
    }
}

// Read review data from Firestore and write it to the screen (most recent reviews first)
function getReviews(store) {
    db.collection("Stores").doc("Costco_" + store).collection("Reviews")
        .orderBy("Date_Time", "desc")
        .onSnapshot((querySnapshot) => {
            // Get information for each review and push to the ratings array
            querySnapshot.forEach((doc) => {
                // Clear existing reviews before posting
                eraseInfoFromDom();
                var name = doc.data().Reviewer_Name;
                var rating = doc.data().Reviewer_Rating;
                var date = doc.data().Date_Time.toDate().toDateString();
                var comment = doc.data().Reviewer_Comment;
                // Create JSON object to house review information
                var reviewInfo = { "name": name, "rating": rating, "date": date, "comment": comment };
                addToMasterArray(reviewInfo);
            });
            console.log(masterArray);
            // Specify a default number of reviews to display
            defaultReviewsPosted = Math.min(masterArray.length, 3);
            postReviews(0, defaultReviewsPosted);
            // Append a "Load More" button to the DOM if at least four reviews have been posted
            if (masterArray.length > defaultReviewsPosted) {
                // Erase button if it already exists
                eraseButtonFromDom();
                var buttonContainer = "<div class='button-container'></div>"
                $("#main-content-card").append(buttonContainer);
                var loadMoreButton = "<button id='load-more-button' class='btn btn-primary button-main'" +
                    "onclick='loadAllReviews()'>Load More</button>";
                $(".button-container").append(loadMoreButton);
                $(".review-container").css({ marginBottom: "10px" });
            }
        });
}

function loadAllReviews() {
    postReviews(defaultReviewsPosted, masterArray.length)
    $("#load-more-button").css({ display: "none" });
}

// Get, update and post average ratings for all stores
function updateRating(store) {
    db.collection("Stores").doc("Costco_" + store).collection("Reviews")
        .where("Reviewer_Rating", "!=", "null")
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
            console.log(ratings);
            var avgRating;
            if (ratings[0]) {
                avgRating = sum / ratings.length;
            } else {
                avgRating = 0;
            }
            if (avgRating == 0) {
                document.getElementById("current-rating").innerHTML = "Average Rating: " + avgRating
                    .toFixed(0) + "/5";
            } else {
                document.getElementById("current-rating").innerHTML = "Average Rating: " + avgRating
                    .toFixed(1) + "/5";
            }

            $("#current-rating").attr("class", "card-text");
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
