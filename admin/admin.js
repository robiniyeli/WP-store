document.addEventListener("DOMContentLoaded", () => {
    const productsSection = document.getElementById("products");
    const productsList = document.createElement("div");
    productsList.className = "admin-products";
    productsSection.appendChild(productsList);
  
    let products = JSON.parse(localStorage.getItem("products")) || [];
  
    function renderProducts() {
      productsList.innerHTML = "";
  
      products.forEach((product, index) => {
        const productEl = document.createElement("div");
        productEl.classList.add("admin-product");
        productEl.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <strong>${product.name}</strong>
          <span>Price: ${product.price}</span>
          <span>Stock: <input type="number" data-index="${index}" class="stock-input" value="${product.stock}" /></span>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        productsList.appendChild(productEl);
      });
    }
  
    // Update stock live
    productsList.addEventListener("input", (e) => {
      if (e.target.classList.contains("stock-input")) {
        const index = e.target.dataset.index;
        products[index].stock = parseInt(e.target.value, 10);
        localStorage.setItem("products", JSON.stringify(products));
      }
    });
  
    // Delete product
    productsList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
      }
    });
  
    // Add product form (optional)
    const addForm = document.createElement("form");
    addForm.innerHTML = `
      <h3>Add New Product</h3>
      <input type="text" placeholder="Name" name="name" required>
      <input type="text" placeholder="Price" name="price" required>
      <input type="text" placeholder="Image URL" name="image" required>
      <input type="number" placeholder="Stock" name="stock" required>
      <button type="submit">Add Product</button>
    `;
    productsSection.appendChild(addForm);
  
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(addForm);
      const newProduct = {
        id: Date.now(),
        name: formData.get("name"),
        price: formData.get("price"),
        image: formData.get("image"),
        stock: parseInt(formData.get("stock"), 10),
      };
      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products));
      addForm.reset();
      renderProducts();
    });
  
    renderProducts();
  });
  