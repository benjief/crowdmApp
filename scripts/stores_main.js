/**************** Stores_Main****************/
var stores = ["Burnaby", "Downtown", "Richmond"];

// Read store name from Firestore and populate box headers in DOM
function updateStoreHeaders(store) {
    db.collection("Stores").doc("Costco_" + store)
        .onSnapshot((doc) => {
            store = store.toLowerCase();
            var storeName = doc.data().Name;
            $("#store-name-" + store).html(storeName);
        });
}

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
            document.getElementById("update-time-" + store).innerHTML = "Updated "
                + Math.floor(timeDifference) + " " + unitOfTime + " ago";
            // Add last update as a url query string for use in store front page
            var currentStore = document.getElementById("store-name-" + store);
            var currentHref = currentStore.getAttribute("href");
            currentStore.setAttribute("href", currentHref + "&updated=" + Math.floor(timeDifference)
                + "&updateunit=" + unitOfTime);
        })
}

// Read real-time headcount data for all stores and write it to the screen
function updateHeadcount(store) {
    db.collection("Stores").doc("Costco_" + store).collection("Latest_Update").doc("latest")
        .onSnapshot((doc) => {
            store = store.toLowerCase();
            document.getElementById("headcount-" + store).innerHTML = "Current: " + doc.data().Current_Headcount;
            // Add current headcount as a url query string for use in store front page
            var currentStore = document.getElementById("store-name-" + store);
            var currentHref = currentStore.getAttribute("href");
            currentStore.setAttribute("href", currentHref + "&headcount=" + doc.data().Current_Headcount);
            if (doc.get("Previous_Headcount") != null) {
                var previousHeadcount = doc.data().Previous_Headcount;
                var headcountChange = doc.data().Current_Headcount - previousHeadcount;
                document.getElementById("previous-headcount-" + store).innerHTML = "Previous: " + previousHeadcount;
                if (headcountChange > 0) {
                    document.getElementById(store + "-ticker").setAttribute("src", "/images/up_arrow.png");
                } else if (headcountChange < 0) {
                    document.getElementById(store + "-ticker").setAttribute("src", "/images/down_arrow.png");
                } else {
                    document.getElementById(store + "-ticker").removeAttribute("src");
                }
            }
        });
}

// Call functions
$(document).ready(function () {
    for (var i = 0; i < stores.length; i++) {
        updateStoreHeaders(stores[i]);
        updateHeadcount(stores[i]);
        updateLastTimeOfLastUpdate(stores[i]);

    }
});


