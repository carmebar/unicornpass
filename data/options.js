function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    salt: document.querySelector("#salt").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#salt").value = result.salt || "randomuuid";
  }

  function onError(error) {
    console.log("Error: ${error}");
  }

  var getting = browser.storage.local.get("salt");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
