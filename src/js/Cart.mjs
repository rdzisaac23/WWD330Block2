// Cart.js
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Cart {
  constructor() {
    this.cartKey = "so-cart";
    this.items = getLocalStorage(this.cartKey) || [];
  }

  addProduct(product) {
    // Add logic to prevent adding duplicate items or increase quantity
    this.items.push(product);
    setLocalStorage(this.cartKey, this.items);
  }

  // More cart-related methods (removeProduct, getCartItems, etc.)
}
