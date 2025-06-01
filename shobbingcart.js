// Dummy data 
const cartItems = [
  {
    id: 1,
    name: "Pokémon TCG: SV8.5 Prismatic Evolutions - Booster Bundle",
    price: 50,
    image: "https://example.com/pokemon.jpg",
    quantity: 1,
  }
];

const TAX = 0.2;
const SHIPPING = 9.99;

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  let totalPrice = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.setAttribute("data-id", item.id);

    div.innerHTML = `
      <div class="product-info">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <div class="product-name">${item.name}</div>
        </div>
      </div>
      <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
      <div>${item.price.toLocaleString()} USD</div>
      <div>${itemTotal.toLocaleString()} USD</div>
      <button class="remove-btn" onclick="removeItem(${item.id})">✕</button>
    `;

    container.appendChild(div);
  });

  const priceNet = totalPrice / (1 + TAX);

  document.getElementById("total-price").textContent = (totalPrice + SHIPPING).toLocaleString() + " USD";
  document.getElementById("total-price-net").textContent = priceNet.toFixed(0).toLocaleString() + " USD";
}

function updateQuantity(id, newQuantity) {
  const item = cartItems.find((p) => p.id === id);
  if (!item) return;

  newQuantity = parseInt(newQuantity);

  if (newQuantity === 0) {
    if (confirm("Do you want to remove this item from the cart?")) {
      removeItem(id);
    } else {
      item.quantity = 1;
      renderCart();
      // Reset the input value visually
      setTimeout(() => {
        const input = document.querySelector(`.cart-item[data-id="${id}"] input[type="number"]`);
        if (input) input.value = 1;
      }, 0);
    }
  } else {
    item.quantity = newQuantity;
    renderCart();
  }
}

function removeItem(id) {
  const index = cartItems.findIndex((p) => p.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    renderCart();
  }
}

window.onload = renderCart;
