// JS for stats.html

const parsedUrl = new URL(window.location.href);
var store = parsedUrl.searchParams.get("store");
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentDate = new Date();
var currentDay = weekdays[currentDate.getDay()];
$("#current-day").html(currentDay);

// Costco hours at our locations are 9AM - 8:30PM
var hoursInACostcoDay = 12;
// Create empty array to store all update documents pulled from Firestore
var masterArray = [];
// Create empty array to store hourly headcount averages
var hourlyAverages = [];
// Create an array of hours in the day
var hoursIn24HrFormat = []
// Initialize values to "No data"
for (var i = 0; i < hoursInACostcoDay; i++) {
    hourlyAverages[i] = "No data";
}
// Initialize values to 0
for (var i = 0; i < hoursInACostcoDay; i++) {
    hoursIn24HrFormat[i] = 0;
}

// Reset all of the arrays needed to properly post update information to their initial states
function resetArrays() {
    masterArray = [];
    // Initialize values to "No data"
    for (var i = 0; i < hoursInACostcoDay; i++) {
        hourlyAverages[i] = "No data";
    }
    // Initialize values to 0
    for (var i = 0; i < hoursInACostcoDay; i++) {
        hoursIn24HrFormat[i] = 0;
    }
}


// Write the store name at the top of the screen
function writeStoreName(store) {
    $(".page-heading").html("Stats: Costco " + store);
}

// Add JSON object to master array containing all updates
function addToMasterArray(updateInfo) {
    masterArray.push(updateInfo);
}

// Calculate hourly averages from headcount update documents
function calculateHourlyAverages() {
    for (var i = 0; i < hourlyAverages.length; i++) {
        var sum = 0;
        var counter = 0;
        for (var j = 0; j < masterArray.length; j++) {
            if (masterArray[j]["hour"] == (i + 9)) {
                sum += masterArray[j]["headcount"];
                counter++;
            }
            // Populate hourly averages array if an average exists
            if (counter != 0) {
                var average = sum / counter;
                // Replace "No data" at row i with the calculated average
                hourlyAverages.splice(i, 1, average.toFixed(0));
                // Reset the average to 0 once the row has been dealt with
                average = 0;
            }
        }
    }
}

// Create an array of hours to populate the DOM
function formatTimes() {
    for (var i = 0; i < hoursIn24HrFormat.length; i++) {
        // Format the hour nicely
        var formattedHour;
        // 09:00
        if (i == 0) {
            formattedHour = "0" + (i + 9) + ":00";
          // All the rest
        } else {
            formattedHour = (i + 9) + ":00";
        }
        hoursIn24HrFormat.splice(i, 1, formattedHour);
    }
}

// Erase times and their corresponding headcounts from the DOM if they exist
function eraseInfoFromDom() {
    var tableData = document.getElementsByClassName('hour-row');
    while (tableData[0]) {
        tableData[0].parentNode.removeChild(tableData[0]);
    }
}

// Append times and their corresponding headcounts to the DOM
function appendInfoToDom() {
    formatTimes();
    for (var i = 0; i < hoursInACostcoDay; i++) {
        var hour = "<tr class='hour-row' id='" + i.toString() + "-row'></tr>";
        var formattedHour = "<td class='hour-data' id='" + i.toString() + "-hour'></td>";
        var headCount = "<td class='headcount-data' id='" + i.toString() + "-headcount'></td>";
        $("#stats-table").append(hour);
        $("#" + i.toString() + "-row").append(formattedHour);
        $("#" + i.toString() + "-row").append(headCount);
        $("#" + i.toString() + "-hour").html(hoursIn24HrFormat[i].toString());
        $("#" + i.toString() + "-headcount").html(hourlyAverages[i]);
    }
}

// Get headcount updates for the current day
function getUpdateInfo(store, currentDay) {
    db.collection("Stores").doc("Costco_" + store).collection(currentDay)
        // .where("Current_Headcount", "!=", null)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().Date_Time) {
                    var time = doc.data().Date_Time.toDate().getHours();
                }
                var headcount = doc.data().Current_Headcount;
                var updateInfo = { "hour": time, "headcount": headcount };
                addToMasterArray(updateInfo);
            });
            calculateHourlyAverages();
            eraseInfoFromDom();
            appendInfoToDom();
        });
}

function moveDayBack() {
    if (currentDay === weekdays[0]) {
        currentDay = weekdays[weekdays.length - 1];
    } else {
        currentDay = weekdays[weekdays.indexOf(currentDay) - 1];
    }
    document.getElementById("current-day").innerHTML = currentDay;
    resetArrays();
    getUpdateInfo(store, currentDay);
}

function moveDayForward() {
    if (currentDay === weekdays[weekdays.length - 1]) {
        currentDay = weekdays[0];
    } else {
        currentDay = weekdays[weekdays.indexOf(currentDay) + 1];
    }
    document.getElementById("current-day").innerHTML = currentDay;
    console.log(currentDay);
    resetArrays();
    getUpdateInfo(store, currentDay);
    console.log(masterArray);
}

$(document).ready(function () {
    writeStoreName(store);
    getUpdateInfo(store, currentDay);
});
