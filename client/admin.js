const product = document.getElementById("button")
product.addEventListener("click",function(event) {
    event.preventDefault()
    const productImage = document.getElementById("file").files[0]

    if (productImage) {
        console.log("image", productImage)

        const formData = new FormData()

        formData.append("image", productImage)
        console.log(new Date().toISOString())

        console.log(...formData)
    
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("url image upload success to cloudinary", result)
        // db.collection("products")
        //   .add({
        //     name: productName,
        //     price: productPrice,
        //     imageUrl: result.data.secure_url,
        //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //   })
        //   .then(() => {
        //     console.log("Product added successfully!");
        //     loadProducts();
        //   })
        //   .catch((error) => {
        //     console.error("Error adding product: ", error);
        //   });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
    }

})
