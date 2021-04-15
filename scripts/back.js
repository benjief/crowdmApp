// JS for back button

// Go back and refresh the page (fixes errors with floating forms)
function GoBackWithRefresh(event) {
    if ('referrer' in document) {
        // window.location = document.referrer;
        /* OR */
        location.replace(document.referrer);
    } else {
        window.history.back();
    }
}