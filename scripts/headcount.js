// Head Counter
var timeout, interval, headcount = 0;

// Addition
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
    //stops counter when not pressing the button
    function clearTimers() {
        clearTimeout(timeout);
        clearInterval(interval);
        document.getElementById("increase-headcount").style.backgroundColor = "rgb(238, 238, 238)";
    }
});

function incrementValue(x) {
    document.getElementById(x).textContent = "Headcount: " + ++headcount;
};

// Substraction
[].forEach.call(document.querySelectorAll('.subtract'), function (button) {
    button.addEventListener('mousedown', function () {
        document.getElementById("decrease-headcount").style.backgroundColor = "red";
        var y = button.dataset.target;
        decrementValue(y);
        timeout = setTimeout(function () {
            interval = setInterval(function () {
                decrementValue(y);
            }, 80); //counting speed set in milliseconds.
        }, 600); //hold down delay set in milliseconds. 
    });
    button.addEventListener('mouseup', clearTimers);
    button.addEventListener('mouseleave', clearTimers);
    //stops counter when not pressing the button
    function clearTimers() {
        clearTimeout(timeout);
        clearInterval(interval);
        document.getElementById("decrease-headcount").style.backgroundColor = "rgb(238, 238, 238)";
    }
});

function decrementValue(y) {
    if (headcount > 0) {
        document.getElementById(y).textContent = "Headcount: " + --headcount;
    };
};

function displayInvalidFeedback(feedback, selectedStore) {
            // Display invalid selection prompt if a store isn't selected
            feedback.innerHTML = "Please select a valid Costco location from the dropdown list.";
            $(feedback).css({
                color: "red"
            });
            $(feedback).show(0);
            $(feedback).fadeOut(2500);
            console.log("No update written");
}

function onClickUpdate() {
    var feedback = document.getElementById("feedback");
    if (!selectedStore || selectedStore === "invalid") {
        displayInvalidFeedback(feedback, selectedStore);
    } else {
        // Get correct store name (in DB format)
        var storeToUpdate = "Costco_" + selectedStore;
        // Fetch current user
        currentUser = firebase.auth().currentUser
            .email; // delete and change code below (or use variables on other pages)
        console.log(currentUser); // delete
        // Get timestamp at time of click
        var timestamp = firebase.firestore.FieldValue.serverTimestamp(); // delete and change code below?
        // Get previous headcount
        var docRef = db.collection("Stores").doc(storeToUpdate).collection("Latest_Update").doc("latest");
        var previousHeadcount;
        docRef.get().then((doc) => {
            if (doc.exists) {
                previousHeadcount = doc.data()
                    .Current_Headcount; // Get headcount for entry being replaced
                // Add update to "Latest_Update" collection
                db.collection("Stores").doc(storeToUpdate).collection("Latest_Update").doc("latest")
                    .set({
                        Current_Headcount: headcount,
                        Date_Time: timestamp,
                        Updater: currentUser,
                        Previous_Headcount: previousHeadcount
                    })
                    .then(() => {
                        console.log("Document successfully written!");
                        // Get correct day of the week
                        var weekday;
                        docRef.get().then((doc) => { // Get the latest update
                            if (doc.exists) {
                                weekday = doc.data().Date_Time; // Read the Date_Time entry
                                weekday = weekday
                                    .toDate(); // Convert it to a JS date object
                                weekday = weekday
                                    .getDay(); // Get the day from this JS date object (0 = Sunday, ..., 6 = Saturday)
                                switch (weekday) { // Fetch the correct weekday
                                    case 0:
                                        weekday = "Sunday";
                                        break;
                                    case 1:
                                        weekday = "Monday";
                                        break;
                                    case 2:
                                        weekday = "Tuesday";
                                        break;
                                    case 3:
                                        weekday = "Wednesday";
                                        break;
                                    case 4:
                                        weekday = "Thursday";
                                        break;
                                    case 5:
                                        weekday = "Friday";
                                        break;
                                    case 6:
                                        weekday = "Saturday";
                                        break;
                                }
                                // Add timestamp to correct day collection
                                db.collection("Stores").doc(storeToUpdate).collection(
                                        weekday).add({
                                        Current_Headcount: headcount,
                                        Date_Time: timestamp,
                                        Updater: currentUser,
                                        Previous_Headcount: previousHeadcount
                                    })
                                    .then((docRef) => {
                                        console.log("Document written with ID: ", docRef
                                            .id);
                                        // Display successful update message
                                        function displaySuccessfulFeedback() {
                                            feedback.innerHTML = "Update Successful.";
                                            $(feedback).css({
                                                color: "green"
                                            });
                                            $(feedback).show(0);
                                            $(feedback).fadeOut(2500);
                                        }
                                        displaySuccessfulFeedback();
                                    })
                                    .catch((error) => {
                                        console.error("Error adding document: ", error);
                                    });
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }).catch((error) => {
                            console.log("Error getting document:", error);
                        });
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            } else {
                // Add update to "Latest_Update" collection - this code will run if there isn't already an initial update
                db.collection("Stores").doc(storeToUpdate).collection("Latest_Update").doc("latest")
                    .set({
                        Current_Headcount: headcount,
                        Date_Time: timestamp,
                        Updater: currentUser
                    })
                console.log("An initial 'latest update' has been added!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    }
}