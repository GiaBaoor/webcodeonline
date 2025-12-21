const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Vui lòng nhập email và mật khẩu");
    return;
  }

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const userDoc = await db.collection("users").doc(user.uid).get();
    console.log("userId", user.uid);
    if (!userDoc.exists) {
      alert("Tài khoản chưa được phân quyền");
      return;
    }

    const role = userDoc.data().role;

    localStorage.setItem("userId", user.uid);
    localStorage.setItem("role", role);

    if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "trangchu.html";
    }

  } catch (error) {
    alert("Sai email hoặc mật khẩu");
    console.error(error);
  }
});

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