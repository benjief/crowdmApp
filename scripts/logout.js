function logout() {
    FirebaseAuth.getInstance().signOut();
}