// Read store data in from Firestore based on a parsed URL, and display store details on the screen
function getStoreDetails(store, headcount, lastUpdate) {
    db.collection("Stores").doc("Costco_" + store)
        .onSnapshot((doc) => {
            // Store name, headcount and last update information
            jQuery('<p/>', {
                class: "page-heading",
                html: "Costco " + store
            }).prependTo('.heading-container');
            jQuery('<p/>', {
                class: "page-subheading",
                html: headcount + "<br/>" + lastUpdate
            }).appendTo('.heading-container');
            // Embedded map
            jQuery('<iframe/>', {
                src: "https://www.google.com/maps?q=" + doc.data().Address + "&output=embed",
                allowfullscreen: "",
                loading: "lazy",
                gestureHandling: "greedy"
            }).prependTo('.map');
            // Store address, hours and phone number
            jQuery('<p/>', {
                id: "store-address",
                html: doc.data().Address + "<br/>Store Hours: " + doc.data().Hours + "<br/>Store Phone: " + doc.data().Phone_Number
            }).appendTo('.store-info-container');
        });
}

// Display buttons for reviews and historical statistics with appropriate links attached (based on store location)
function displayButtons(store) {
    // "View Reviews" button
    jQuery('<a/>', {
        class: "btn btn-primary button-main",
        id: "view-reviews-button",
        href: "reviews.html?store=" + store,
        role: "button",
        html: "View Reviews"
    }).appendTo('.button-container');
    // "View Historical Statistics" button
    jQuery('<a/>', {
        class: "btn btn-primary button-main",
        id: "view-stats-button",
        href: "stats.html?store=" + store,
        role: "button",
        html: "View Historical Statistics"
    }).appendTo('.button-container');
}

// Call functions
$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    var store = parsedUrl.searchParams.get("store");
    var headcount = "Current Occupancy: " + parsedUrl.searchParams.get("headcount") + "/300";
    var lastUpdate = "Updated " + parsedUrl.searchParams.get("updated") + " "
        + parsedUrl.searchParams.get("updateunit") + " ago";
    getStoreDetails(store, headcount, lastUpdate);
    displayButtons(store);
});
