// document.addEventListener('DOMContentLoaded', function() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     renderCartItems(cart);
//     updateSummary(cart);
//   });
  
//   function renderCartItems(cart) {
//     const container = document.getElementById('cart-items');
//     container.innerHTML = '';
    
//     cart.forEach(item => {
//       const itemElement = document.createElement('div');
//       itemElement.className = 'cart-item';
//       itemElement.innerHTML = `
//         <div class="product-info">
//           <img src="${item.image}" alt="${item.name}">
//           <span>${item.name}</span>
//         </div>
//         <input type="number" value="${item.quantity}" min="1" 
//                onchange="updateQuantity('${item.id}', this.value)">
//         <span>$${item.price.toFixed(2)}</span>
//         <span>$${(item.price * item.quantity).toFixed(2)}</span>
//         <button onclick="removeItem('${item.id}')">×</button>
//       `;
//       container.appendChild(itemElement);
//     });
//   }
  
//   function updateQuantity(id, quantity) {
//     let cart = JSON.parse(localStorage.getItem('cart'));
//     const item = cart.find(item => item.id === id);
    
//     if (item) {
//       item.quantity = parseInt(quantity);
//       localStorage.setItem('cart', JSON.stringify(cart));
//       renderCartItems(cart);
//       updateSummary(cart);
//     }
//   }
  
//   function removeItem(id) {
//     let cart = JSON.parse(localStorage.getItem('cart'));
//     cart = cart.filter(item => item.id !== id);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     renderCartItems(cart);
//     updateSummary(cart);
//   }
  
//   function updateSummary(cart) {
//     const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const shipping = 9.99;
//     const total = subtotal + shipping;
    
//     document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
//     document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
//     document.getElementById('total').textContent = `$${total.toFixed(2)}`;
//   }

  // js/cart.js

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const shippingCost = 9.99;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  const emptyMessage = document.getElementById("empty-cart-message");
  const summary = document.querySelector(".cart-summary");

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    summary.style.display = "none";
    return;
  } else {
    emptyMessage.style.display = "none";
    summary.style.display = "block";
  }

  cart.forEach((item, index) => {
    const itemTotal = parseFloat(item.price.replace("$", "")) * item.quantity;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <span>${item.quantity}</span>
      <span>${item.price}</span>
      <span>$${itemTotal.toFixed(2)}</span>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;
}

  
    cartItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });
  
    renderCart();
  });