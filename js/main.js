// Shared functions across the site
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
  });
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
    });
  }
  
// Shared functions across the site
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
  });
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
  
    // Update all elements with the class 'cart-count'
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
    });
  
    // Update the red ball (badge) with the real-time count
    const redBall = document.querySelector('.cart-badge');
    if (redBall) {
      redBall.textContent = count;
      redBall.style.display = count > 0 ? 'block' : 'none'; // Hide if count is 0
    }
  }
  
  // Add to cart function
  function addToCart(productId, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, name, price, image, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Sync the counter and red ball with the updated cart
    alert('Product added to cart!');
  }