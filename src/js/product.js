import { setLocalStorage, getLocalStorage } from "./utils.js";
import ProductData from "./ProductData.js";
import { getParams } from './utils.mjs';
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams('product');

const product = new ProductDetails(productId, dataSource);
product.init();

console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  // Retrieve existing cart items from local storage
  let cartItems = getLocalStorage("so-cart");
 
  // If not array, initialize as empty array
  if (!Array.isArray(cartItems)) {
     cartItems = [];
  }
 
  // Add new product to cartItems array
  cartItems.push(product);
 
  // Save updated cartItems array back to local storage
  setLocalStorage("so-cart", cartItems);
 }

// add to cart button event handler
async function addToCartHandler(e) {
  try {
    const product = await dataSource.findProductById(e.target.dataset.id);
    addProductToCart(product);
  } catch (error) {
    // console.error(error);
  }
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);


