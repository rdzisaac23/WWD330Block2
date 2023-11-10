// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * This function retrieves the value of a given query parameter from the URL.
 * @param {string} param - The name of the query parameter to retrieve.
 * @return {string|null} - The value of the query parameter, or null if not found.
 */
export function getParams(param) {
  // Retrieve query string from URL
  const queryString = window.location.search;
   
  // Create URLSearchParams object with query string
  const urlParams = new URLSearchParams(queryString);
   
  // Get parameter value by key from URLSearchParams object
  return urlParams.get(param);
 }