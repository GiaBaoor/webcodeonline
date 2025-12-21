// 1: đăng nhập thành công thì lưu userid lên localStorage
// 2: đăng xuất thành công thì xóa userid khỏi localStorage
// 3: ở bên trang chủ sẽ kiểm tra bên localStorage có userid chưa, nếu có thì hiển thị nút đăng xuất, không thì hiển thị nút đăng nhập
window.addEventListener("load", function () {
    const userId = localStorage.getItem("userId");
    if (userId) {
        document.getElementById("logoutBtn").style.display = "block";
        document.getElementById("loginBtn").style.display = "none";
    } else {
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("loginBtn").style.display = "block";
    }
});

document.getElementById("logoutBtn").addEventListener("click", function () {
    auth.signOut()
        .then(() => {
            localStorage.removeItem("userId");
            alert("Đăng xuất thành công!");
            window.location.reload();
        }
        )
        .catch(error => {
            alert("Lỗi đăng xuất: " + error.message);
        });
});

// load khóa học nổi bật
db.collection("courses")
  .limit(6)
  .get()
  .then(snapshot => {
    const container = document.getElementById("featured-courses");
    snapshot.forEach(doc => {
      const c = doc.data();
      container.innerHTML += `
        <div class="course-card">
          <img src="${c.thumbnail}">
          <h3>${c.title}</h3>
          <p>${c.level} • ${c.price.toLocaleString()}đ</p>
          <a href="courses.html?id=${doc.id}">Xem chi tiết</a>
        </div>
      `;
    });
  });