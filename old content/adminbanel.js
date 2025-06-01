// Handle section switching
const menuItems = document.querySelectorAll('.menu li');
const sections = document.querySelectorAll('.panel-section');
const sectionTitle = document.getElementById('section-title');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active class from all
    menuItems.forEach(i => i.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    // Add active to clicked
    item.classList.add('active');
    const target = item.getAttribute('data-section');
    const section = document.getElementById(target);
    section.classList.add('active');

    // Update section title
    sectionTitle.textContent = item.textContent.trim();

    // Hide product modal if switching away from products section
    if (target !== 'products') {
      const modal = document.getElementById('productModal');
      if (modal) modal.style.display = 'none';
    }
  });
});

// Handle delete buttons in Users section
document.querySelectorAll('#users button').forEach(btn => {
  btn.addEventListener('click', function () {
    const row = this.closest('tr');
    if (row) row.remove();
  });
});

let products = [];

const addProductBtn = document.getElementById("addProductBtn");
const modal = document.getElementById("productModal");
const closeModal = document.querySelector(".close-btn");
const form = document.getElementById("productForm");
const productTable = document.getElementById("productTableBody");
const modalTitle = document.getElementById("modalTitle");

addProductBtn.onclick = () => {
  openModal();
};

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

form.onsubmit = function (e) {
  e.preventDefault();
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const stock = document.getElementById("productStock").value;
  const image = document.getElementById("productImage").files[0];

  const reader = new FileReader();
  reader.onloadend = function () {
    const imageUrl = reader.result;

    if (id) {
      const index = products.findIndex(p => p.id === id);
      products[index] = { id, name, price, stock, imageUrl };
    } else {
      const newProduct = {
        id: Date.now().toString(),
        name,
        price,
        stock,
        imageUrl
      };
      products.push(newProduct);
    }

    renderProducts();
    modal.style.display = "none";
    form.reset();
  };

  if (image) {
    reader.readAsDataURL(image);
  } else {
    reader.onloadend();
  }
};

function renderProducts() {
  productTable.innerHTML = "";
  products.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.imageUrl || ''}" alt="${product.name}"></td>
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.stock}</td>
      <td><button onclick="editProduct('${product.id}')">Edit</button></td>
    `;
    productTable.appendChild(row);
  });
}

function openModal(product = null) {
  modal.style.display = "block";
  modalTitle.textContent = product ? "Edit Product" : "Add Product";
  document.getElementById("productId").value = product?.id || "";
  document.getElementById("productName").value = product?.name || "";
  document.getElementById("productPrice").value = product?.price || "";
  document.getElementById("productStock").value = product?.stock || "";
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  openModal(product);
}

