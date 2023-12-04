import { getLocalStorage } from "./utils.mjs";

// Function to render the contents of the cart
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    console.error('Cart items are not in an array format');
    // Handle the case when cartItems is not an array
  }
}


// Template for individual cart items
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

// Function to calculate and update the cart total
function updateCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
  document.querySelector('.cart-footer').classList.remove('hide');
}

// Call renderCartContents when the page loads
document.addEventListener('DOMContentLoaded', renderCartContents);