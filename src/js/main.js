// Import the necessary modules.
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create a new instance of ProductData for the "tents" category.
const dataSource = new ProductData("tents");

// Select the DOM element where the product list will be rendered.
const element = document.querySelector(".product-list");

// Create a new ProductList instance, providing the category, data source, and DOM element.
const listing = new ProductList("Tents", dataSource, element);

// Initialize the listing to fetch and render the products.
listing.init();
