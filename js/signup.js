
document.getElementById("registerBtn").addEventListener("click", function (){
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, pass)
            .then(userCredential => {
                const user = userCredential.user;
                // Cập nhật displayName
                // user.updateProfile({ displayName: userName }).then(() => {
                //     // Lưu role vào Firestore
                //     firebase.firestore().collection("users").doc(user.uid).set({
                //         email: email,
                //         username: userName,
                //         role: role,
                //         createdAt: firebase.firestore.FieldValue.serverTimestamp()
                //     })
                //         .then(() => {
                //             alert(`Đăng ký thành công! Chào ${userName} (${role})`);
                //             window.location.href = "/Client/html/login.html"
                //         })
                //         .catch(err => {
                //             alert("Lưu role vào Firestore thất bại: " + err.message);
                //         });
                // });
                alert(`Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.`);
                window.location.href = "../html/login.html"
            })
            .catch(error => {
                alert("Lỗi đăng ký: " + error.message);
            });

})