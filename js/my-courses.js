const userId = localStorage.getItem("userId");

if (!userId) { 
  alert("Vui lòng đăng nhập để xem khóa học của bạn.");
  window.location.href = "../html/login.html";
}

  // db.collection("users").doc(uid).get()
  //   .then(doc => {
  //     if (!doc.exists) return;

  //     const data = doc.data();

  //     // // Chặn admin
  //     // if (data.role === "admin") {
  //     //   window.location.href = "admin.html";
  //     //   return;
  //     // }

  //     loadMyCourses(data.myCourses);
  //   });

function loadMyCourses() {
  const courseList = document.getElementById("my-course-list");
  const boughtSnapshot = db.collection("user_courses")
    .where("userId", "==", userId)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        courseList.innerHTML = "<p>Bạn chưa mua khóa học nào.</p>";
        return;
      }
      snapshot.forEach(doc => {
        const data = doc.data();
        db.collection("courses").doc(data.courseId).get()
          .then(courseDoc => {
            if (!courseDoc.exists) return;
            const course = courseDoc.data();
            courseList.innerHTML += `
              <div class="course-card">
                <img src="${course.thumbnail}">
                <h3>${course.title}</h3>
                <p>${course.level} • ${course.price.toLocaleString()}đ</p>
                <a href="course-detail.html?id=${courseDoc.id}">Xem chi tiết</a>
              </div>
            `;
          });
      });
    });
}
loadMyCourses();