var browser = chrome || browser;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof chrome !== "undefined"){
  chrome.storage.local.get("salt", (r) => {document.querySelector("#salt").value = r.salt;});
  }else{
  browser.storage.local.get("salt").then((r) => {document.querySelector("#salt").value = r.salt;});
  }
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  browser.storage.local.set({
    salt: document.querySelector("#salt").value
  });
});
