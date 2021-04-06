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
            +"<span>Rating: </span>" + masterArray[i]["rating"] + "<br/>"
            +"<span>Comments: </span>" + masterArray[i]["comment"]);
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
                var reviewInfo = { "name": name, "rating": rating, "comment": comment};
                addToMasterArray(reviewInfo);
            });
            console.log(masterArray);
            postReviews(0, defaultReviewsPosted);
        });
}

function loadAllReviews() {
    postReviews(defaultReviewsPosted, masterArray.length)
    $("#load-more-button").fadeOut(500);
}

// Call functions
$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    var store = parsedUrl.searchParams.get("store");
    pageSetUp(store);
    getReviews(store);
    // updateRating(store);
});

// function viewReviewsRichmond() {

//     db.collection("Stores").doc("Costco_Richmond").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Name);
//                 ratings.push(doc.data().Reviewer_Rating);
//                 ratings.push(doc.data().Reviewer_Comment);

//             });

//             let t2 = "<div>"
//             for (let i = 0; i < 9; i++) {
//                 t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
//                     ratings[i] + "</h5></div>";
//             }
//             t2 += "</div>";
//             document.getElementById("review").innerHTML = t2;


//         });

// }
// //Call functions
// viewReviewsRichmond();


// function LoadMore1() {
//     db.collection("Stores").doc("Costco_Richmond").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Name);
//                 ratings.push(doc.data().Reviewer_Rating);
//                 ratings.push(doc.data().Reviewer_Comment);

//             });

//             let t2 = "<div>"
//             for (let i = 9; i < ratings.length; i++) {
//                 t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
//                     ratings[i] + "</h5></div>";
//             }
//             t2 += "</div>";
//             document.getElementById("richmond-more").innerHTML = t2;
//             $("#richmond-more").toggle();

//         });

// }

// function viewReviewsDowntown() {

//     db.collection("Stores").doc("Costco_Downtown").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Name);
//                 ratings.push(doc.data().Reviewer_Rating);
//                 ratings.push(doc.data().Reviewer_Comment);

//             });

//             let t2 = "<div>"
//             for (let i = 0; i < 9; i++) {
//                 t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
//                     ratings[i] + "</h5></div>";
//             }
//             t2 += "</div>";
//             document.getElementById("review1").innerHTML = t2;


//         });

// }
// //Call functions
// viewReviewsDowntown();


// function LoadMore2() {
//     db.collection("Stores").doc("Costco_Downtown").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Name);
//                 ratings.push(doc.data().Reviewer_Rating);
//                 ratings.push(doc.data().Reviewer_Comment);

//             });

//             let t2 = "<div>"
//             for (let i = 9; i < ratings.length; i++) {
//                 t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
//                     ratings[i] + "</h5></div>";
//             }
//             t2 += "</div>";
//             document.getElementById("downtown-more").innerHTML = t2;
//             $("#downtown-more").toggle();

//         });

// }

// function viewReviewsBurnaby() {

//     db.collection("Stores").doc("Costco_Burnaby").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Name);
//                 ratings.push(doc.data().Reviewer_Rating);
//                 ratings.push(doc.data().Reviewer_Comment);

//             });

//             let t2 = "<div>"
//             for (let i = 0; i < 9; i++) {
//                 t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
//                     ratings[i] + "</h5></div>";
//             }
//             t2 += "</div>";
//             document.getElementById("review2").innerHTML = t2;


//         });

// }
// //Call functions
// viewReviewsBurnaby();


// function LoadMore3() {
//     db.collection("Stores").doc("Costco_Burnaby").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Name);
//                 ratings.push(doc.data().Reviewer_Rating);
//                 ratings.push(doc.data().Reviewer_Comment);

//             });

//             let t2 = "<div>"
//             for (let i = 9; i < ratings.length; i++) {
//                 t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
//                     ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
//                     ratings[i] + "</h5></div>";
//             }
//             t2 += "</div>";
//             document.getElementById("burnaby-more").innerHTML = t2;
//             $("#burnaby-more").toggle();

//         });

// }

