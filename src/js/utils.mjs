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

export function renderWithTemplate(template, parent, data, callback) {
  parent.innerHTML = '';
  parent.appendChild(document.importNode(template, true));
  if (callback) {
    callback(data);
  }
}

export async function loadHeaderFooter(path) {
  try {
    // Load the template from the given path
    const template = await loadTemplate(path);

    // Grab the header and footer elements from the DOM
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Render the header and footer using the loaded template
    if (header) {
      renderWithTemplate(template.content, header);
    }
    if (footer) {
      renderWithTemplate(template.content, footer);
    }
  } catch (error) {
    console.error('Error loading header and footer:', error);
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    return response.text();
  });

  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}


export async function loadHeaderFooter() {
  // Load header and footer templates
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  // Grab header and footer elements from the DOM
  const headerElement = document.querySelector('header');
  const footerElement = document.querySelector('footer');

  // Render templates into the DOM elements
  if (headerElement) {
    renderWithTemplate(headerTemplate.content, headerElement);
  }
  if (footerElement) {
    renderWithTemplate(footerTemplate.content, footerElement);
  }
}
