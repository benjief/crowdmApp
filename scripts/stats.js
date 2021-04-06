/***************** STATS *****************/

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentDate = new Date();
var currentDay = weekdays[currentDate.getDay()];
$("#current-day").html(currentDay);
jQuery('<p/>', {
    id: "test"
}).appendTo('#stats_table');



// Write the store name at the top of the screen
function writeStoreName(store) {
    $("#store-name").html = "Costco " + store;
}


// Read all updates from Firestore and puts them into an array
function getUpdateArray(doc, update_array) {
    // Put each update document into the array 
    if (doc.get("Date_Time") != null && doc.get("Current_Headcount") != null) {
        var time_hc = [];
        // Get the hour the update was posted at (column 1), along with the headcount posted for that update (column 2)
        time_hc.push(doc.data().Date_Time.toDate().getHours());
        time_hc.push(doc.data().Current_Headcount);
        update_array.push(time_hc);
    }
}

/* Separate headcounts in time by storing them in a master array whose rows contain arrays for 
different hours of the day */
function getMasterArray(update_array) {
    var master_array = [];
    var hoursInADay = 24;
    // Add 24 rows to the master array (for each of the hours in a day)
    for (var i = 0; i < hoursInADay; i++) {
        master_array[i] = [];
    }
    // Each row of hours contains separate arrays for headcount updates made during that hour
    for (var i = 0; i < update_array.length; i++) {
        /* update_array[i][0] contains the value for the hour that update was made during.
        If an update was made during the hour x [0-23], we add [update_time headcount_posted]
        to row x of the master array */
        master_array[update_array[i][0]].push(update_array[i]);
    }
    return master_array;
}

// Clear any stats that may already exist on the page (so updated info can be re-added)
function clearCurrentStats() {
    // Get data currently posted as an array
    var currentStats = document.getElementsByClassName('stats_data');
    // Erase the data from the page, if it exists
    while (currentStats[0]) {
        tableData[0].parentNode.removeChild(tableData[0]);
    }
}

// Calculate the average head count for each hour
function calculateAverageHeadCount(master_array, i) {
    // Reset sum for each row
    var sum = 0;
    for (var j = 0; j < master_array[i].length; j++) {
        console.log("i = " + i.toString() + ", j = " + j.toString());
        // Create an individual array for each sub-array (in order to access its elements with indices)
        var currentSubArray = master_array[i][j];
        console.log(currentSubArray);
        // If data exists within the current sub-array, add the head count to the running sum
        if (currentSubArray) {
            console.log(currentSubArray[1]);
            sum += currentSubArray[1];
            console.log(sum);
        }
    }
    /* If the current row is populated, calculate the average from the running sum
    and the length of the row */
    if (master_array[i].length > 0) {
        var average = sum / master_array[i].length;
        average = average.toFixed(0);
    }
    return average;
}

// Get proper format for current hour as a string
function formatHour(i) {
    var time;
    if (i < 10) {
        time = "0" + i.toString() + ":00";
    } else {
        time = i.toString() + ":00";
    }
    return time;
}

// Append the average head count for each hour to the DOM
function appendCurrentStats(master_array) {
    console.log(master_array);
    for (var i = 0; i < master_array.length; i++) {
        // Reset average for each row
        var average = 0;
        jQuery('<p/>', {
            id: "test"
        }).appendTo(document.getElementById('stats_table'));
        jQuery('<tr/>', {
            /* Create a table row with id = the current row being processed 
            (i.e. the hour being averaged), and append it to the DOM/ This is
            where the average for the hour will go */
            id: i.toString(),
            "class": 'stats_data'
        }).appendTo('#stats_table');
        // Calculate the average head count for the current row (hour)
        var average = calculateAverageHeadCount(master_array, i);
        var time = formatHour(i);
        console.log(time);
        // Add hour to DOM table row with id
        jQuery('<td/>', {
            id: time
        }).appendTo('#' + i.toString());
        // Add average headcount to DOM table row
        jQuery('<td/>', {
            id: time + '_hc'
        }).appendTo('#' + i.toString());
        // If an average for a certain hour exists, post it. Otherwise, post "No data"
        // document.getElementById(time).innerHTML = time;
        // if (average) {
        //     document.getElementById(time + '_hc').innerHTML = average;
        // } else {
        //     document.getElementById(time + '_hc').innerHTML = "No data";
        // }
    }
}

function calculateStats(store) {
    db.collection("Stores").doc("Costco_" + store).collection(currentDay)
        .onSnapshot((querySnapshot) => {
            var update_array = [];
            querySnapshot.forEach((doc) => {
                getUpdateArray(doc, update_array);
            });
            var master_array = getMasterArray(update_array);
            clearCurrentStats();
            appendCurrentStats(master_array);
        });
}

function moveDayBack() {
    if (currentDay === weekdays[0]) {
        currentDay = weekdays[weekdays.length - 1];
    } else {
        currentDay = weekdays[weekdays.indexOf(currentDay) - 1];
    }
    document.getElementById("current-day").innerHTML = currentDay;
    calculateStats();
}

function moveDayForward() {
    if (currentDay === weekdays[weekdays.length - 1]) {
        currentDay = weekdays[0];
    } else {
        currentDay = weekdays[weekdays.indexOf(currentDay) + 1];
    }
    document.getElementById("current-day").innerHTML = currentDay;
    calculateStats();
}

$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    var store = parsedUrl.searchParams.get("store");
    writeStoreName(store);
    calculateStats(store);
});
