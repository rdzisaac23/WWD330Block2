// product.js
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import Cart from "./Cart.mjs";
import {setLocalStorage, getParam } from "./utils.mjs";

// This script should be included in the product detail page

const productId = getParam("product");
const dataSource = new ProductData("tents");
const cart = new Cart(); // Creates an instance of the Cart class

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.getElementById("addToCart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", async () => {
      try {
        const product = await dataSource.findProductById(productId);
        cart.addProduct(product); // Adds the product to the cart
        alert('Product added to cart!');
      } catch (error) {
        console.error("Could not add product to cart:", error);
        alert('Failed to add product to cart.');
      }
    });
  }
});
