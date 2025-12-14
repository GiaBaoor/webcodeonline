// chon ảnh xong => hiện lên giao diện 
// const imageInput = document.getElementById('profileImage');
// imageInput.addEventListener('change', function(e) {
// const file = e.target.files[0];
// if (file) {
//     const reader = new FileReader();
//     reader.onload = function(event) {
//         imagePreview.src = event.target.result;
//     };
//     reader.readAsDataURL(file);
// }
// });


// const productForm = document.querySelector("#userForm");

// productForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;
//   const profileImage = document.getElementById("profileImage").files[0]; // Lấy file ảnh

//   if (profileImage) {
//     const formData = new FormData();

//     formData.append("image", profileImage);
//     console.log(new Date().toISOString());
//     fetch("http://localhost:3000/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log("url image upload success to cloudinary", result)
//         // db.collection("products")
//         //   .add({
//         //     name: productName,
//         //     price: productPrice,
//         //     imageUrl: result.data.secure_url,
//         //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         //   })
//         //   .then(() => {
//         //     console.log("Product added successfully!");
//         //     loadProducts();
//         //   })
//         //   .catch((error) => {
//         //     console.error("Error adding product: ", error);
//         //   });
//       })
//       .catch((error) => {
//         console.error("Error uploading image:", error);
//       });
//   }
// });

// Hiển thị danh sách sản phẩm
function loadProducts() {
  console.log("check")
  const productTableBody = document.getElementById("product-list");
  let htmls = "";
  let index = 1;
  db.collection("courses")
  .get()
  .then((querySnapshot) => {
      console.log("data", querySnapshot)
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        console.log("item", product)
        htmls += `
                        <tr class="product-item">
                            <th scope="row">${index}</th>
                            <td>${product.title}</td>
                            <td>${product.category}</td>
                            <td>${product.description}</td>
                            <td>${product.level}</td>
                            <td>${product.price}</td>
                            <td>${product.thumbnail}</td>
                            <td>
                                <button class="btn btn-danger btn-sm btn-delete-product" data-id="${doc.id}"><i class="fa-light fa-trash-can"></i></button>
                            </td>
                        </tr>
                    `;
        index++;
      });
      productTableBody.innerHTML = htmls;

      // xu ly chuc nang bam vao nut xoa san pham cho tung san
      // const btnDeleteProduct = document.querySelectorAll(".btn-delete-product");
      // btnDeleteProduct.forEach((btn) => {
      //   btn.addEventListener("click", () => {
      //     const productId = btn.getAttribute("data-id");
      //     // deleteProduct(productId);
      //     loadProducts();
      //   });
      // });
    })
    .catch((error) => {
      console.error("Error fetching products: ", error);
    });
}
loadProducts()