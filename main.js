"use strict";

var browser = typeof chrome === 'undefined'? browser : chrome;

function getSalt(){
  return new Promise((res, _) => {
    if (typeof chrome !== 'undefined'){
      browser.storage.local.get('salt', (r) => { res(r.salt); }); //Chrome uses callbacks
    }else{
      browser.storage.local.get('salt').then( (r) => {
        if (Array.isArray && Array.isArray(r))
          r = r[0]; //Workaround for FF < 52
        res(r.salt);
      });
    }
  });
}

function setRandomSalt(){
  browser.storage.local.set({
    salt: '{x-x-x}'.replace(/x/g,()=>crypto.getRandomValues(new Uint32Array(1))[0].toString(16))
  });
}

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install')
    setRandomSalt();
  else if (details.reason === 'update')
    getSalt().then((salt) => {
      if (typeof salt === 'undefined')
        setRandomSalt();
    });
});
