const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");
console.log("Course ID:", courseId);
const userId = localStorage.getItem("userId");

const titleEl = document.getElementById("course-title");
const descEl = document.getElementById("course-description");
const catEl = document.getElementById("course-category");
const levelEl = document.getElementById("course-level");
const priceEl = document.getElementById("course-price");
const videoBox = document.getElementById("video-box");

const buyBtn = document.getElementById("buyBtn");
const learnBtn = document.getElementById("learnBtn");
async function init() {
// Load all courses from Firestore
const courseDoc = await db.collection("courses").doc(courseId).get();
  if (!courseDoc.exists) {
    alert("Khóa học không tồn tại");
    return;
  }
const c = courseDoc.data();
titleEl.innerText = c.title;
descEl.innerText = c.description;
catEl.innerText = "📂 " + c.category;
levelEl.innerText = "🎯 " + c.level;
priceEl.innerText = "💰 " + formatPrice(c.price);``
// Preview video
videoBox.innerHTML = `
    <iframe src="${c.youtubeUrl}" allowfullscreen></iframe>
`;
//   allCourses.push(c);
  // Nếu chưa login
if (!userId) {
buyBtn.onclick = () => window.location.href = "login.html";
return;
}

  // Check đã mua chưa
  const bought = await db.collection("user_courses")
    .where("userId", "==", userId)
    .where("courseId", "==", courseId)
    .get();

  if (!bought.empty) {
    buyBtn.style.display = "none";
    learnBtn.style.display = "block";
  }


buyBtn.addEventListener("click", async () => {
  await db.collection("user_courses").add({
    userId,
    courseId,
    boughtAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert("Mua khóa học thành công!");
  buyBtn.style.display = "none";
  learnBtn.style.display = "block";
});

learnBtn.addEventListener("click", () => {
  window.location.href = "my-courses.html";
});

function formatPrice(price) {
  if (!price || price === 0) return "Miễn phí";
  return price.toLocaleString("vi-VN") + " ₫";
}
};

init();