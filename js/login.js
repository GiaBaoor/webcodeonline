


document.getElementById("loginBtn").addEventListener("click", function (e) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      localStorage.setItem("userId", userCredential.uid);
      // const uid = userCredential.user.uid;

      // Lấy role từ Firestore
      // db.collection("users").doc(uid).get()
      //   .then(doc => {
          // if (!doc.exists) {
          //   errorEl.innerText = "Không tìm thấy user!";
          //   return;
          // }

          // const userData = doc.data();

          // if (userData.role === "admin") {
          //   window.location.href = "admin.html";
          // } else {
          //   window.location.href = "my-courses.html";
          // }
        // });
        alert("Đăng nhập thành công!");
        window.location.href = "../html/trangchu.html";
    })
    .catch(error => {
      alert("Lỗi đăng nhập: " + error.message);
    });
})

// // authentication
//         auth.signInWithEmailAndPassword(email, password)
//         .then(userCredential => {
//             const user = userCredential.user;
//             alert(`Đăng nhập thành công! Chào ${user.displayName || user.email}`);
//             // Nếu muốn, có thể chuyển hướng trang
//             window.location.href = "/Client/html/home.html";
//         })
//         .catch(error => {
//             alert("Lỗi đăng nhập: " + error.message);
//         });
//     });