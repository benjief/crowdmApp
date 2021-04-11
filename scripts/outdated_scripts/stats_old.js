/***************** stats *****************/
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentDay = weekdays[2];
$("#current-day").html(currentDay);
var test = "<p></p>";
$("#current-day").append(test);
$("#current-day").html("TEST");

// function getNumbers() {
//     db.collection("Stores").doc("Costco_Downtown").collection(currentDay)
//         .onSnapshot((querySnapshot) => {
//             var data_table = [];
//             querySnapshot.forEach((doc) => {
//                 if (doc.get("Date_Time") != null && doc.get("Current_Headcount") != null) {
//                     var time_hc = [];
//                     time_hc.push(doc.data().Date_Time.toDate().getHours());
//                     time_hc.push(doc.data().Current_Headcount);
//                     data_table.push(time_hc);
//                 }
//             });
//             console.log(data_table);
//             // Separate headcounts in time by storing them in a master table whose rows contain arrays for different hours of the day
//             // Each row of hours contains multiple arrays for headcount updates made at that hour
//             var master_table = [];
//             var hoursInADay = 24;
//             for (var i = 0; i < hoursInADay; i++) {
//                 master_table[i] = [];
//             }
//             console.log(master_table);
//             //
//             for (var i = 0; i < data_table.length; i++) {
//                 master_table[data_table[i][0]].push(data_table[i]);
//             }
//             console.log(master_table[2]);
//             console.log(master_table[5]);
//             // Get rid of any table data that already exists (so it can be re-written)
//             var tableData = document.getElementsByClassName('table_data');
//             while (tableData[0]) {
//                 tableData[0].parentNode.removeChild(tableData[0]);
//             }
//             // Average headcounts for each hour
//             for (var i = 0; i < master_table.length; i++) {
//                 var sum = 0; // Reset sum for each row
//                 var average = 0; // Reset average for each row
//                 jQuery('<tr/>', {
//                     id: i.toString(),
//                     "class": 'table_data'
//                 }).appendTo('#stats_table tbody');
//                 for (var j = 0; j < master_table[i].length; j++) {
//                     console.log("i = " + i.toString() + ", j = " + j.toString());
//                     var currentSubArray = master_table[i][j];
//                     console.log(currentSubArray);
//                     if (master_table[i][j]) {
//                         console.log(currentSubArray[1]);
//                         sum += currentSubArray[1];
//                         console.log(sum);
//                     }
//                 }
//                 if (master_table[i].length > 0) {
//                     var average = sum / master_table[i].length;
//                     average = average.toFixed(0);
//                 }
//                 var timeData;
//                 if (i < 10) {
//                     timeData = "0" + i.toString() + ":00";
//                 } else {
//                     timeData = i.toString() + ":00";
//                 }
//                 // Add hour to row
//                 jQuery('<td/>', {
//                     id: timeData
//                 }).appendTo('#' + i.toString());
//                 // Add average headcount to row
//                 jQuery('<td/>', {
//                     id: timeData + '_hc'
//                 }).appendTo('#' + i.toString());
//                 document.getElementById(timeData).innerHTML = timeData;
//                 if (average) {
//                     document.getElementById(timeData + '_hc').innerHTML = average;
//                 } else {
//                     document.getElementById(timeData + '_hc').innerHTML = "No data";
//                 }
//             }
//         });
// }

// function moveDayBack() {
//     if (currentDay === weekdays[0]) {
//         currentDay = weekdays[weekdays.length - 1];
//     } else {
//         currentDay = weekdays[weekdays.indexOf(currentDay) - 1];
//     }
//     document.getElementById("current_day").innerHTML = currentDay;
//     // getNumbers();
// }

// function moveDayForward() {
//     if (currentDay === weekdays[weekdays.length - 1]) {
//         currentDay = weekdays[0];
//     } else {
//         currentDay = weekdays[weekdays.indexOf(currentDay) + 1];
//     }
//     document.getElementById("current_day").innerHTML = currentDay;
//     // getNumbers();
// }

// Call functions
// getNumbers();