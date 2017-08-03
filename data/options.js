document.addEventListener("DOMContentLoaded", () => {
  browser.storage.local.get("salt").then((r) => {document.querySelector("#salt").value = r.salt;});
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  browser.storage.local.set({
    salt: document.querySelector("#salt").value
  });
});
