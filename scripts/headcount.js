/* Set variables up to increase/decrease headcount, the selected store name, the days of the week, the current weekday, 
and the previous headcount */
var timeout, interval, headcount = 0;
var store;
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentWeekday;
var previousHeadcount;


// Set up a variable to store feedback to be posted
var feedback = document.getElementById("feedback");

// Get the selected store name
function getSelectedStore() {
    store = "Costco_" + floatingSelect.value;
}

// Increase the headcount and tally displayed
function incrementValue(x) {
    ++headcount;
    document.getElementById(x).textContent = "Headcount: " + headcount;
};

// Increase headcount
[].forEach.call(document.querySelectorAll('.add'), function (button) {
    button.addEventListener('mousedown', function () {
        document.getElementById("increase-headcount").style.backgroundColor = "green";
        var x = button.dataset.target;
        incrementValue(x);
        timeout = setTimeout(function () {
            interval = setInterval(function () {
                incrementValue(x);
            }, 80);                     // Counting speed set in milliseconds
        }, 600);                        // Hold down delay set in milliseconds
    });
    button.addEventListener('mouseup', clearTimers);
    button.addEventListener('mouseleave', clearTimers);
    // Stops counter when not pressing the button
    function clearTimers() {
        clearTimeout(timeout);
        clearInterval(interval);
        document.getElementById("increase-headcount").style.backgroundColor = "rgb(238, 238, 238)";
    }
});

// Decrease the headcount and tally displayed
function decrementValue(y) {
    if (headcount > 0) {
        --headcount;
        document.getElementById(y).textContent = "Headcount: " + headcount;
    };
};

// Decrease Headcount
[].forEach.call(document.querySelectorAll('.subtract'), function (button) {
    button.addEventListener('mousedown', function () {
        document.getElementById("decrease-headcount").style.backgroundColor = "red";
        var y = button.dataset.target;
        decrementValue(y);
        timeout = setTimeout(function () {
            interval = setInterval(function () {
                decrementValue(y);
            }, 80);                 // Counting speed set in milliseconds
        }, 600);                    // Hold down delay set in milliseconds.
    });
    button.addEventListener('mouseup', clearTimers);
    button.addEventListener('mouseleave', clearTimers);
    // Stops counter when not pressing the button
    function clearTimers() {
        clearTimeout(timeout);
        clearInterval(interval);
        document.getElementById("decrease-headcount").style.backgroundColor = "rgb(238, 238, 238)";
    }
});

// Display a message asking the user to select a store before attempting to submit an update
function displayInvalidFeedback() {
    // Display invalid selection prompt if a store isn't selected
    feedback.innerHTML = "Please select a valid Costco location from the dropdown list";
    $(feedback).css({
        color: "red"
    });
    $(feedback).show(0);
    $(feedback).fadeOut(2500);
    console.log("No update written");
}

// Display successful update message, if update is written
function displaySuccessfulFeedback() {
    feedback.innerHTML = "Update Successful";
    $(feedback).css({
        color: "green"
    });
    $(feedback).show(0);
    $(feedback).fadeOut(2500);
}

// Get the headcount of the next-most-recent update posted
function getPreviousHeadcount(store) {
    var timestamp = firebase.firestore.FieldValue.serverTimestamp(); 
    db.collection("Stores").doc(store).collection("Latest_Update").doc("latest")
        .get().then((doc) => {
            previousHeadcount = doc.data().Current_Headcount;
            // Replace the latest update with the current one
            replaceLatestUpdate(store, timestamp);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}

// Overwrite the next-most-recent update posted
function replaceLatestUpdate(store, timestamp) {
    db.collection("Stores").doc(store).collection("Latest_Update").doc("latest")
        .set({
            Current_Headcount: headcount,
            Date_Time: timestamp,
            Updater_Name: currentUser,
            Updater_Email: currentUserEmail,
            Previous_Headcount: previousHeadcount
        }).then(() => {
            console.log("Latest update successfully written!");
            // Add update to the correct weekday collection of the selected store
            storeUpdate(store, timestamp);
            displaySuccessfulFeedback();
        })
        .catch(() => {
            console.log("Error writing latest update.");
        });
}

// Store the update in the correct weekday collection of the selected store
function storeUpdate(store, timestamp) {
    db.collection("Stores").doc(store).collection(currentWeekday)
        .add({
            Current_Headount: headcount,
            Date_Time: timestamp,
            Updater_Name: currentUser,
            Updater_Email: currentUserEmail,
            Previous_Headcount: previousHeadcount
        }).then(() => {
            console.log("Update successfully stored!");
        })
        .catch(() => {
            console.log("Error storing update:", error);
        });
}

// Get the current weekday
function getWeekday() {
    var currentDate = new Date();
    currentWeekday = weekdays[currentDate.getDay()];
}


// Update the headcount
function updateHeadcount(store) {
    // Get current user's name
    currentUser = firebase.auth().currentUser.displayName;
    // Get current user's email
    currentUserEmail = firebase.auth().currentUser.email;
    // Get timestamp at time of click
    var timestamp = firebase.firestore.FieldValue.serverTimestamp();
    /* Get headcount of previous update - note that the document "latest" in each store's "Latest_Update"
       collection must be present and have an attribute called "Current_Headcount" with a value of 0 before
       updates can start being posted. */
    getPreviousHeadcount(store);
}

// Write an update to the correct store and day in Firestore; note that the latest update is stored in a separate collection ("Latest_Update")
function onClickUpdate() {
    console.log(store);
    // If a store hasn't been selected, display an error message
    if (!store || store === "Costco_invalid") {
        displayInvalidFeedback();
    } else {
        // Get day at time of click
        getWeekday();
        // Write the current headcount to Firestore
        updateHeadcount(store);
    }
}
