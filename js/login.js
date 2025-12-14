function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error");

  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      // Lấy role từ Firestore
      db.collection("users").doc(uid).get()
        .then(doc => {
          if (!doc.exists) {
            errorEl.innerText = "Không tìm thấy user!";
            return;
          }

          const userData = doc.data();

          if (userData.role === "admin") {
            window.location.href = "admin.html";
          } else {
            window.location.href = "my-courses.html";
          }
        });
    })
    .catch(error => {
      errorEl.innerText = error.message;
    });
}