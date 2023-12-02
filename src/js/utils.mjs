// utils.mjs

/**
 * Wrapper for querySelector that returns the first matching element.
 * @param {string} selector - The CSS selector to match the element.
 * @param {ParentNode} [parent=document] - The parent node to query within.
 * @return {Element|null} The first matching element or null if none found.
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Retrieve data from localStorage.
 * @param {string} key - The key associated with the data to retrieve.
 * @return {any} The parsed value from localStorage or undefined if not found.
 */
export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.error("Error reading from localStorage", e);
    return null;
  }
}

/**
 * Save data to localStorage.
 * @param {string} key - The key to associate with the data to save.
 * @param {any} data - The data to save.
 */
export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
}

/**
 * Set a listener for both touchend and click events on a given element.
 * @param {string} selector - The CSS selector to match the element.
 * @param {Function} callback - The callback function to execute on the event.
 */
export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  } else {
    console.warn(`Element with selector "${selector}" not found.`);
  }
}

/**
 * Retrieve the value of a query parameter from the URL.
 * @param {string} param - The name of the query parameter to retrieve.
 * @return {string|null} The value of the query parameter, or null if not found.
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/**
 * Render a list of items to the DOM using a template function.
 * @param {Function} templateFn - The template function to create HTML string.
 * @param {Element} parentElement - The container element to render items into.
 * @param {Array} list - The list of items to be rendered.
 * @param {string} [position="afterbegin"] - The position relative to the parentElement.
 * @param {boolean} [clear=false] - Whether to clear the parentElement first.
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(item => templateFn(item)).join('');
  parentElement.insertAdjacentHTML(position, htmlStrings);
}
