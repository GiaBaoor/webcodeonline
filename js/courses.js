const container = document.getElementById("course-list");
const catBtns = document.querySelectorAll(".cat-btn");

let allCourses = [];

// Load all courses from Firestore
db.collection("courses")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const c = doc.data();
      c.id = doc.id; // Save Firestore ID
      allCourses.push(c);
    });

    renderCourses(allCourses);
  });

// Render courses to UI
function renderCourses(list) {
  container.innerHTML = "";

  list.forEach(c => {
    const card = `
      <div class="course-card">

        <img class="course-thumb" src="${c.thumbnail}" />

        <div class="course-info">
            <div class="course-title">${c.title}</div>

            <div class="course-meta">
              <span class="level ${c.level.toLowerCase()}">${c.level}</span>
              <span class="price">${formatPrice(c.price)}</span>
            </div>

            <div class="course-desc">${c.description}</div>

            <div class="course-vid">
                <iframe src="${c.youtubeUrl}" allowfullscreen></iframe>
            </div>

            <a class="btn" href="course-detail.html?id=${c.id}">Xem chi tiết</a>
            <button class="btn-buy" data-id="${c.id}">Mua khóa học</button>
        </div>

      </div>
    `;

    container.innerHTML += card;
  });
}

function formatPrice(price) {
  if (!price || price === 0) return "Miễn phí";
  return price.toLocaleString("vi-VN") + " ₫";
}

// Category filtering
catBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".cat-btn.active").classList.remove("active");
    btn.classList.add("active");

    const cat = btn.dataset.cat;

    if (cat === "all") {
      renderCourses(allCourses);
    } else {
      const filtered = allCourses.filter(c => c.category === cat);
      renderCourses(filtered);
    }
  });
});

// Button buy course
container.addEventListener("click", e => {
  if (e.target.classList.contains("btn-buy")) {
    const courseId = e.target.dataset.id;
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Vui lòng đăng nhập để mua khóa học.");
      window.location.href = "login.html";
      return;
    } 
    // check đã mua khóa học chưa
    const existed = db.collection("user_courses")
     .where("userId", "==", userId)
      .where("courseId", "==", courseId)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          alert("Bạn đã mua khóa học này rồi.");
          return;
        }
    // Lưu mua khoá học
        db.collection("user_courses").add({
          userId: userId,
          courseId: courseId,
          boughtAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        alert("Mua khóa học thành công!");
    })
}});