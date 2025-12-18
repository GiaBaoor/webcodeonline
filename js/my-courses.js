firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const uid = user.uid;

  db.collection("users").doc(uid).get()
    .then(doc => {
      if (!doc.exists) return;

      const data = doc.data();

      // // Chặn admin
      // if (data.role === "admin") {
      //   window.location.href = "admin.html";
      //   return;
      // }

      loadMyCourses(data.myCourses);
    });
});

function loadMyCourses(courseIds) {
  const container = document.getElementById("my-course-list");
  container.innerHTML = "";

  if (!courseIds || courseIds.length === 0) {
    container.innerHTML = "<p>Bạn chưa có khóa học nào.</p>";
    return;
  }

  courseIds.forEach(id => {
    db.collection("courses").doc(id).get()
      .then(doc => {
        const c = doc.data();

        container.innerHTML += `
          <div class="course-card">
            <h3>${c.title}</h3>
            <iframe src="${c.youtubeUrl}" allowfullscreen></iframe>
          </div>
        `;
      });
  });
}