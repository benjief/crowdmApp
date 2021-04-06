/**************** Stores ****************/

var stores = ["Burnaby", "Downtown", "Richmond"];

// Read latest update time for each store, and calculate/write it to the screen
function updateLastTimeOfLastUpdate(store) {
    db.collection("Stores").doc("Costco_" + store).collection("Latest_Update").doc("latest")
        .onSnapshot((doc) => {
            // Get timestamp of latest update
            store = store.toLowerCase();
            var updateTime = doc.data().Date_Time.toDate();
            // Create a new date to compare timestamp to
            var currentTime = new Date();
            // Calculate time difference between latest update and current time in milliseconds
            var timeDifference = currentTime.getTime() - updateTime.getTime();
            // Define variables to convert from milliseconds to other units of time
            var oneSecond = 1000;
            var oneMinute = 60 * oneSecond;
            var oneHour = 60 * oneMinute;
            var oneDay = 24 * oneHour;
            var oneYear = 365.25 * oneDay;
            var unitOfTime;
            // Get the correct unit of time to post
            if (timeDifference < oneSecond) {
                unitOfTime = "milliseconds";
            } else if (oneSecond <= timeDifference && timeDifference < oneMinute) {
                unitOfTime = "seconds";
                timeDifference /= oneSecond;
            } else if (oneMinute <= timeDifference && timeDifference < oneHour) {
                unitOfTime = "minutes";
                timeDifference /= oneMinute;
            } else if (oneHour <= timeDifference && timeDifference < oneDay) {
                unitOfTime = "hours";
                timeDifference /= oneHour;
            } else if (oneDay <= timeDifference && timeDifference < oneYear) {
                unitOfTime = "days";
                timeDifference /= oneDay;
            } else {
                unitOfTime = "years";
                timeDifference /= oneYear;
            }
            document.getElementById("update_time_" + store).innerHTML = "Last updated "
                + Math.floor(timeDifference) + " " + unitOfTime + " ago"
        })
}

// Read real-time headcount data for all stores and write it to the screen
function updateHeadcount(store) {
    db.collection("Stores").doc("Costco_" + store).collection("Latest_Update").doc("latest")
        .onSnapshot((doc) => {
            store = store.toLowerCase();
            document.getElementById("headcount_" + store).innerHTML = doc.data().Current_Headcount;
            if (doc.get("Previous_Headcount") != null) {
                var headcountChange = doc.data().Current_Headcount - doc.data().Previous_Headcount;
                if (headcountChange > 0) {
                    document.getElementById(store + "_change").innerHTML = "Increase: " + Math.abs(headcountChange);
                    document.getElementById(store + "_ticker").setAttribute("src", "/images/up_arrow.png");
                } else if (headcountChange < 0) {
                    document.getElementById(store + "_change").innerHTML = "Decrease: " + Math.abs(headcountChange);
                    document.getElementById(store + "_ticker").setAttribute("src", "/images/down_arrow.png");
                } else {
                    document.getElementById(store + "_ticker").removeAttribute("src");
                }
            }
        });
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
            document.getElementById(store + "_stars").setAttribute("style", "--rating: " + avgRating.toFixed(
                1).toString() + ";");
            document.getElementById("current_rating_" + store).innerHTML = "Current rating: " + avgRating
                .toFixed(1);
        });
}

// Call functions
for (var i = 0; i < stores.length; i++) {
    updateHeadcount(stores[i]);
    updateLastTimeOfLastUpdate(stores[i]);
    updateRating(stores[i]);
}