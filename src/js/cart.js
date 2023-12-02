import { getLocalStorage } from "./utils.mjs";

// Function to render the contents of the cart
function renderCartContents() {
  try {
    const cartItems = getLocalStorage("so-cart") || [];
    const htmlItems = cartItems.map(item => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Update the cart total if there are items in the cart
    if (cartItems.length > 0) {
      updateCartTotal(cartItems);
    } else {
      // Hide the cart total element if the cart is empty
      document.querySelector(".cart-footer").classList.add("hide");
    }
  } catch (error) {
    console.error("Error rendering cart contents:", error);
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