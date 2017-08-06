"use strict";

document.addEventListener('DOMContentLoaded', () => {
  getSalt().then((salt) => { document.querySelector('#salt').value = salt; });
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  browser.storage.local.set({
    salt: document.querySelector('#salt').value
  });
});
