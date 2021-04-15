// JS for logout

/* User will be logged out upon clicking on the "Log Out" button in the nav bar 
   As such, they will have to sign in again if they want to have access to the app's core features */
function logout() {
    FirebaseAuth.getInstance().signOut();
}