var browser = chrome || browser;
browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install")
    browser.storage.local.set({
      salt: "{x-x-x}".replace(/x/g,()=>crypto.getRandomValues(new Uint32Array(1))[0].toString(16))
    });
});
