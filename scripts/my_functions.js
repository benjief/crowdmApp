function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            //console.log(somebody.uid);
            db.collection("Users")
                .doc(somebody.uid)
                .get() //READ
                .then(function (doc) {
                    console.log(doc.data().Name);
                    var n = doc.data().Name;
                    $(".name-goes-here").text(n);
                });
        }
    });
}
sayHello();

/***************** copy function which doesn't work *****************/
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

/***************** reviews *****************/

function viewReviewsRichmond() {

    db.collection("Stores").doc("Costco_Richmond").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            var count = 0;
            querySnapshot.forEach((doc) => {
                count++; 
                do{
                    ratings.push(doc.data().Reviewer_Name);
                    ratings.push(doc.data().Reviewer_Rating);
                    ratings.push(doc.data().Reviewer_Comment);
                } while (count <= 3);
                
            });

            // let t2 =
            //     "<table><tr><th>Name</th><th>Rating</th><th>Comment</th>";
            // for (let i = 0; i < ratings.length; i++) {
            //     t2 += "<tr><td>" + ratings[i++] + "</td><td>" +
            //         ratings[i++] + "</td><td>" + ratings[i] + "</td></tr>";
            // }
            // t2 += "</table>";
            // document.getElementById("review").innerHTML = t2;

            let t2 = "<div>"
            for (let i = 0; i < ratings.length; i++) {
                t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
                    ratings[i] + "</h5></div>";
            }
            t2 += "</div>";
            document.getElementById("review").innerHTML = t2;

        });

}
//Call functions
viewReviewsRichmond();

function viewReviewsDowntown() {

    db.collection("Stores").doc("Costco_Downtown").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Name);
                ratings.push(doc.data().Reviewer_Rating);
                ratings.push(doc.data().Reviewer_Comment);
            });
            // let t2 =
            //     "<table><tr><th>Name</th><th>Rating</th><th>Comment</th>";
            // for (let i = 0; i < ratings.length; i++) {
            //     t2 += "<tr><td>" + ratings[i++] + "</td><td>" +
            //         ratings[i++] + "</td><td>" + ratings[i] + "</td></tr>";
            // }
            // t2 += "</table>";
            // document.getElementById("review").innerHTML = t2;

            let t2 = "<div>"
            for (let i = 0; i < ratings.length; i++) {
                t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
                    ratings[i] + "</h5></div>";
            }
            t2 += "</div>";
            document.getElementById("review").innerHTML = t2;

        });

}
//Call functions
viewReviewsDowntown();

function viewReviewsBurnaby() {

    db.collection("Stores").doc("Costco_Burnaby").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Name);
                ratings.push(doc.data().Reviewer_Rating);
                ratings.push(doc.data().Reviewer_Comment);
            });

            // let t2 =
            //     "<table><tr><th>Name</th><th>Rating</th><th>Comment</th>";

            let t2 = "<div>"
            for (let i = 0; i < ratings.length; i++) {
                t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
                    ratings[i] + "</h5></div>";
            }
            t2 += "</div>";
            document.getElementById("review").innerHTML = t2;

        });

}
//Call functions
viewReviewsBurnaby();

/***************** stats *****************/
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentDay = weekdays[1];

function getNumbers() {
    db.collection("Stores").doc("Costco_Downtown").collection(currentDay)
        .onSnapshot((querySnapshot) => {
            var data_table = [];
            querySnapshot.forEach((doc) => {
                if (doc.get("Date_Time") != null && doc.get("Current_Headcount") != null) {
                    var time_hc = [];
                    time_hc.push(doc.data().Date_Time.toDate().getHours());
                    time_hc.push(doc.data().Current_Headcount);
                    data_table.push(time_hc);
                }
            });
            // Separate headcounts in time by storing them in a master table whose rows contain arrays for different hours of the day
            // Each row of hours contains multiple arrays for headcount updates made at that hour
            var master_table = [];
            var hoursInADay = 24;
            for (var i = 0; i < hoursInADay; i++) {
                master_table[i] = [];
            }
            //
            for (var i = 0; i < data_table.length; i++) {
                master_table[data_table[i][0]].push(data_table[i]);
            }
            console.log(master_table[0]);
            console.log(master_table[1]);
            console.log(master_table[1][1]);
            // Get rid of any table data that already exists (so it can be re-written)
            var tableData = document.getElementsByClassName('table_data');
            while (tableData[0]) {
                tableData[0].parentNode.removeChild(tableData[0]);
            }
            // Average headcounts for each hour
            for (var i = 0; i < master_table.length; i++) {
                var sum = 0; // Reset sum for each row
                var average = 0; // Reset average for each row
                jQuery('<tr/>', {
                    id: i.toString(),
                    "class": 'table_data'
                }).appendTo('#stats_table');
                for (var j = 0; j < master_table[i].length; j++) {
                    console.log("i = " + i.toString() + ", j = " + j.toString());
                    var currentSubArray = master_table[i][j];
                    console.log(currentSubArray);
                    if (master_table[i][j]) {
                        console.log(currentSubArray[1]);
                        sum += currentSubArray[1];
                        console.log(sum);
                    }
                }
                if (master_table[i].length > 0) {
                    var average = sum / master_table[i].length;
                    average = average.toFixed(0);
                }
                var timeData;
                if (i < 10) {
                    timeData = "0" + i.toString() + ":00";
                } else {
                    timeData = i.toString() + ":00";
                }
                // Add hour to row
                jQuery('<td/>', {
                    id: timeData
                }).appendTo('#' + i.toString());
                // Add average headcount to row
                jQuery('<td/>', {
                    id: timeData + '_hc'
                }).appendTo('#' + i.toString());
                document.getElementById(timeData).innerHTML = timeData;
                if (average) {
                    document.getElementById(timeData + '_hc').innerHTML = average;
                } else {
                    document.getElementById(timeData + '_hc').innerHTML = "No data";
                }

            }
        });
}

function moveDayBack() {
    if (currentDay === weekdays[0]) {
        currentDay = weekdays[weekdays.length - 1];
    } else {
        currentDay = weekdays[weekdays.indexOf(currentDay) - 1];
    }
    document.getElementById("current_day").innerHTML = currentDay;
    getNumbers();
}

function moveDayForward() {
    if (currentDay === weekdays[weekdays.length - 1]) {
        currentDay = weekdays[0];
    } else {
        currentDay = weekdays[weekdays.indexOf(currentDay) + 1];
    }
    document.getElementById("current_day").innerHTML = currentDay;
    getNumbers();
}

// Call functions
getNumbers();


/**************** Stores ****************/
// Read real-time Burnaby headcount data and write it to the screen
function updateHeadcountBurnaby() {
    db.collection("Stores").doc("Costco_Burnaby").collection("Latest_Update").doc("latest")
        .onSnapshot((doc) => {
            document.getElementById("headcount_burnaby").innerHTML = doc.data().Current_Headcount;
            document.getElementById("update_time_burnaby").innerHTML = doc.data().Date_Time.toDate();
        });
}

// Read real-time Downtown headcount data and write it to the screen
function updateHeadcountDowntown() {
    db.collection("Stores").doc("Costco_Downtown").collection("Latest_Update").doc("latest")
        .onSnapshot((doc) => {
            document.getElementById("headcount_downtown").innerHTML = doc.data().Current_Headcount;
            document.getElementById("update_time_downtown").innerHTML = doc.data().Date_Time.toDate();
        });
}

// Read real-time Richmond headcount data and write it to the screen
function updateHeadcountRichmond() {
    db.collection("Stores").doc("Costco_Richmond").collection("Latest_Update").doc("latest")
        .onSnapshot((doc) => {
            document.getElementById("headcount_richmond").innerHTML = doc.data().Current_Headcount;
            console.log(doc.data().Current_Headcount);
            document.getElementById("update_time_richmond").innerHTML = doc.data().Date_Time.toDate();
        });
}

// Call functions
updateHeadcountBurnaby();
updateHeadcountDowntown();
updateHeadcountRichmond();

/**************** Initialize the FirebaseUI Widget using Firebase. ****************/
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            //------------------------------------------------------------------------------------------
            // The code below is modified from default snippet provided by the FB documentation.
            //
            // If the user is a "brand new" user, then create a new "user" in your own database.
            // Assign this user with the name and email provided.
            // Before this works, you must enable "Firestore" from the firebase console.
            // The Firestore rules must allow the user to write. 
            //------------------------------------------------------------------------------------------
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) { //if new user
                db.collection("Users").doc(user.uid).set({ //write to firestore
                        Name: user.displayName, //"users" collection
                        Email: user.email, //with authenticated user's ID (user.uid)
                        User_Group: "member"
                    })
                    .then(function () {
                        console.log("New user added to firestore");
                        window.location.assign(
                            "../member/main.html"); //re-direct to main.html after signup
                    })
                    .catch(function (error) {
                        console.log("Error adding new user: " + error);
                    });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../member/main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            //------------------------------------------------------------------------------------------
            // The code below is modified from default snippet provided by the FB documentation.
            //
            // If the user is a "brand new" user, then create a new "user" in your own database.
            // Assign this user with the name and email provided.
            // Before this works, you must enable "Firestore" from the firebase console.
            // The Firestore rules must allow the user to write. 
            //------------------------------------------------------------------------------------------
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) { //if new user
                db.collection("Users").doc(user.uid).set({ //write to firestore
                        Name: user.displayName, //"users" collection
                        Email: user.email, //with authenticated user's ID (user.uid)
                        User_Group: "employee"
                    })
                    .then(function () {
                        console.log("New user added to firestore");
                        window.location.assign(
                            "/web/employee/employee_main.html"
                        ); //re-direct to employee_main.html after signup
                    })
                    .catch(function (error) {
                        console.log("Error adding new user: " + error);
                    });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../employee/employee_main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
