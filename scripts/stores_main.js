/**************** Stores ****************/

var stores = ["Burnaby", "Downtown", "Richmond"];

// Read real-time headcount data for all stores and write it to the screen

function updateHeadcount(store) {
    db.collection("Stores").doc("Costco_" + store).collection("Latest_Update").doc("latest")
        .onSnapshot((doc) => {
            store = store.toLowerCase();
            document.getElementById("headcount_" + store).innerHTML = doc.data().Current_Headcount;
            document.getElementById("update_time_" + store).innerHTML = doc.data().Date_Time.toDate();
            if (doc.get("Previous_Headcount") != null) {
                document.getElementById(store + "_change").innerHTML = Math.abs(doc.data()
                    .Current_Headcount - doc.data().Previous_Headcount);
                if (doc.data().Previous_Headcount > doc.data().Current_Headcount) {
                    document.getElementById(store + "_ticker").setAttribute("src", "/images/down_arrow.png");
                } else if (doc.data().Previous_Headcount < doc.data().Current_Headcount) {
                    document.getElementById(store + "_ticker").setAttribute("src", "/images/up_arrow.png");
                } else {
                    document.getElementById(store + "_ticker").removeAttribute("src");
                }
            }
        });
}

// // Read real-time Burnaby headcount data and write it to the screen
// function updateHeadcountBurnaby() {
//     db.collection("Stores").doc("Costco_Burnaby").collection("Latest_Update").doc("latest")
//         .onSnapshot((doc) => {
//             document.getElementById("headcount_burnaby").innerHTML = doc.data().Current_Headcount;
//             document.getElementById("update_time_burnaby").innerHTML = doc.data().Date_Time.toDate();
//             if (doc.get("Previous_Headcount") != null) {
//                 document.getElementById("burnaby_change").innerHTML = Math.abs(doc.data()
//                     .Current_Headcount - doc.data().Previous_Headcount);
//                 if (doc.data().Previous_Headcount > doc.data().Current_Headcount) {
//                     document.getElementById("burnaby_ticker").setAttribute("src", "/images/down_arrow.png");
//                 } else if (doc.data().Previous_Headcount < doc.data().Current_Headcount) {
//                     document.getElementById("burnaby_ticker").setAttribute("src", "/images/up_arrow.png");
//                 } else {
//                     document.getElementById("burnaby_ticker").removeAttribute("src");
//                 }
//             }
//         });
// }

// // Read real-time Downtown headcount data and write it to the screen
// function updateHeadcountDowntown() {
//     db.collection("Stores").doc("Costco_Downtown").collection("Latest_Update").doc("latest")
//         .onSnapshot((doc) => {
//             document.getElementById("headcount_downtown").innerHTML = doc.data().Current_Headcount;
//             document.getElementById("update_time_downtown").innerHTML = doc.data().Date_Time.toDate();
//             if (doc.get("Previous_Headcount") != null) {
//                 document.getElementById("downtown_change").innerHTML = Math.abs(doc.data()
//                     .Current_Headcount - doc.data().Previous_Headcount);
//                 if (doc.data().Previous_Headcount > doc.data().Current_Headcount) {
//                     document.getElementById("downtown_ticker").setAttribute("src",
//                         "/images/down_arrow.png");
//                 } else if (doc.data().Previous_Headcount < doc.data().Current_Headcount) {
//                     document.getElementById("downtown_ticker").setAttribute("src", "/images/up_arrow.png");
//                 } else {
//                     document.getElementById("downtown_ticker").removeAttribute("src");
//                 }
//             }
//         });
// }

// // Read real-time Richmond headcount data and write it to the screen
// function updateHeadcountRichmond() {
//     db.collection("Stores").doc("Costco_Richmond").collection("Latest_Update").doc("latest")
//         .onSnapshot((doc) => {
//             document.getElementById("headcount_richmond").innerHTML = doc.data().Current_Headcount;
//             document.getElementById("update_time_richmond").innerHTML = doc.data().Date_Time.toDate();
//             if (doc.get("Previous_Headcount") != null) {
//                 document.getElementById("richmond_change").innerHTML = Math.abs(doc.data()
//                     .Current_Headcount - doc.data().Previous_Headcount);
//                 if (doc.data().Previous_Headcount > doc.data().Current_Headcount) {
//                     document.getElementById("richmond_ticker").setAttribute("src",
//                         "/images/down_arrow.png");
//                 } else if (doc.data().Previous_Headcount < doc.data().Current_Headcount) {
//                     document.getElementById("richmond_ticker").setAttribute("src", "/images/up_arrow.png");
//                 } else {
//                     document.getElementById("richmond_ticker").removeAttribute("src");
//                 }
//             }
//         });
// }

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
            document.getElementById(store + "_stars").setAttribute("style", "--rating: " + avgRating.toFixed(
                1).toString() + ";");
            document.getElementById("current_rating_" + store).innerHTML = "Current rating: " + avgRating
                .toFixed(1);
        });
}

// // Get, update and post average ratings for Burnaby
// function updateRatingBurnaby() {
//     db.collection("Stores").doc("Costco_Burnaby").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Rating);
//             });
//             var sum = 0;
//             for (var j = 0; j < ratings.length; j++) {
//                 sum += ratings[j];
//             }
//             var avgRating = sum / ratings.length;
//             document.getElementById("burnaby_stars").setAttribute("style", "--rating: " + avgRating.toFixed(
//                 1).toString() + ";");
//             document.getElementById("current_rating_burnaby").innerHTML = "Current rating: " + avgRating
//                 .toFixed(1);
//         });
// }

// // Get, update and post average ratings for Downtown
// function updateRatingDowntown() {
//     db.collection("Stores").doc("Costco_Downtown").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Rating);
//             });
//             var sum = 0;
//             for (var j = 0; j < ratings.length; j++) {
//                 sum += ratings[j];
//             }
//             var avgRating = sum / ratings.length;
//             document.getElementById("downtown_stars").setAttribute("style", "--rating: " + avgRating
//                 .toFixed(1).toString() + ";");
//             document.getElementById("current_rating_downtown").innerHTML = "Current rating: " + avgRating
//                 .toFixed(1);
//         });
// }

// // Get, update and post average ratings for Richmond
// function updateRatingRichmond() {
//     db.collection("Stores").doc("Costco_Richmond").collection("Reviews")
//         .onSnapshot((querySnapshot) => {
//             var ratings = [];
//             querySnapshot.forEach((doc) => {
//                 ratings.push(doc.data().Reviewer_Rating);
//             });
//             var sum = 0;
//             for (var j = 0; j < ratings.length; j++) {
//                 sum += ratings[j];
//             }
//             var avgRating = sum / ratings.length;
//             document.getElementById("richmond_stars").setAttribute("style", "--rating: " + avgRating
//                 .toFixed(1).toString() + ";");
//             document.getElementById("current_rating_richmond").innerHTML = "Current rating: " + avgRating
//                 .toFixed(1);
//         });
// }

// Call functions
for (var i = 0; i < stores.length; i++) {
    updateHeadcount(stores[i]);
    updateRating(stores[i]);
}
// updateHeadcountBurnaby();
// updateHeadcountDowntown();
// updateHeadcountRichmond();
// updateRatingBurnaby();
// updateRatingDowntown();
// updateRatingRichmond();