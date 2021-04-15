// JS for logout

function logout() {
    FirebaseAuth.getInstance().signOut();
}