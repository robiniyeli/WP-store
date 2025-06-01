// js/catalogue.js

// Add to Cart Functionality
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".btn");
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const productElement = button.closest(".product");
        const productName = productElement.querySelector("h3").textContent;
        const productPrice = productElement.querySelector(".price").textContent;
        const productImage = productElement.querySelector("img").src;
  
        const cartItem = {
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        };
  
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.name === cartItem.name);
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push(cartItem);
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${productName} has been added to your cart.`);
      });
    });
  });