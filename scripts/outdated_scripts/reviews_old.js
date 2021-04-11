function viewReviewsRichmond() {

    db.collection("Stores").doc("Costco_Richmond").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Name);
                ratings.push(doc.data().Reviewer_Rating);
                ratings.push(doc.data().Reviewer_Comment);

            });

            let t2 = "<div>"
            for (let i = 0; i < 9; i++) {
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


function LoadMore1() {
    db.collection("Stores").doc("Costco_Richmond").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Name);
                ratings.push(doc.data().Reviewer_Rating);
                ratings.push(doc.data().Reviewer_Comment);

            });

            let t2 = "<div>"
            for (let i = 9; i < ratings.length; i++) {
                t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
                    ratings[i] + "</h5></div>";
            }
            t2 += "</div>";
            document.getElementById("richmond-more").innerHTML = t2;
            $("#richmond-more").toggle();

        });

}

function viewReviewsDowntown() {

    db.collection("Stores").doc("Costco_Downtown").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Name);
                ratings.push(doc.data().Reviewer_Rating);
                ratings.push(doc.data().Reviewer_Comment);

            });

            let t2 = "<div>"
            for (let i = 0; i < 9; i++) {
                t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
                    ratings[i] + "</h5></div>";
            }
            t2 += "</div>";
            document.getElementById("review1").innerHTML = t2;


        });

}
//Call functions
viewReviewsDowntown();


function LoadMore2() {
    db.collection("Stores").doc("Costco_Downtown").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Name);
                ratings.push(doc.data().Reviewer_Rating);
                ratings.push(doc.data().Reviewer_Comment);

            });

            let t2 = "<div>"
            for (let i = 9; i < ratings.length; i++) {
                t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
                    ratings[i] + "</h5></div>";
            }
            t2 += "</div>";
            document.getElementById("downtown-more").innerHTML = t2;
            $("#downtown-more").toggle();

        });

}

function viewReviewsBurnaby() {

    db.collection("Stores").doc("Costco_Burnaby").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Name);
                ratings.push(doc.data().Reviewer_Rating);
                ratings.push(doc.data().Reviewer_Comment);

            });

            let t2 = "<div>"
            for (let i = 0; i < 9; i++) {
                t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
                    ratings[i] + "</h5></div>";
            }
            t2 += "</div>";
            document.getElementById("review2").innerHTML = t2;


        });

}
//Call functions
viewReviewsBurnaby();


function LoadMore3() {
    db.collection("Stores").doc("Costco_Burnaby").collection("Reviews")
        .onSnapshot((querySnapshot) => {
            var ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data().Reviewer_Name);
                ratings.push(doc.data().Reviewer_Rating);
                ratings.push(doc.data().Reviewer_Comment);

            });

            let t2 = "<div>"
            for (let i = 9; i < ratings.length; i++) {
                t2 += "<div class='review-box'><h5 class='head'>" + "Name: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Ratings: " + "</h5><h5 class='value'>" +
                    ratings[i++] + "</h5><br><h5 class='head'>" + "Comments: " + "</h5><h5 class='value'>" +
                    ratings[i] + "</h5></div>";
            }
            t2 += "</div>";
            document.getElementById("burnaby-more").innerHTML = t2;
            $("#burnaby-more").toggle();

        });

}