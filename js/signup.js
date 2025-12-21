document.getElementById("registerBtn").addEventListener("click", async function () {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!email || !pass) {
    alert("Vui lòng nhập email và mật khẩu");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
    const user = userCredential.user;

    await db.collection("users").doc(user.uid).set({
      email: user.email,
      role: "user",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("Đăng ký thành công! Bạn có thể đăng nhập.");
    window.location.href = "../html/login.html";

  } catch (error) {
    console.error("Signup error:", error);
    alert ( "Lỗi đăng ký" + error.message);
  }
});