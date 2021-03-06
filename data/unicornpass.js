"use strict";

var browser = typeof chrome === 'undefined'? browser : chrome;
var salt;

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

getSalt().then((currentSalt) => { salt = currentSalt; });

window.addEventListener('keyup',(event) => {
  function buffer2dwords(buffer){
    var r = [];
    var bytes = new DataView(buffer);

    for (var i = 0; i < bytes.byteLength; i+=4)
      r.push(bytes.getUint32(i));

    return r;
  }

  function solidGradient(colors){
    if(colors.length == 1) return colors[0];
    var s = 100/colors.length;

    return 'linear-gradient(to right ,' + colors.map((v,i) => {
      return v + " " + i*s + "%," + v + " " + (i+1)*s + "%"
    }).join() + ')';
  }

  function dword2rgba(i){
    return 'rgba(' + [(i>> 24) & 255, (i>> 16) & 255, (i>> 8) & 255, (i & 255)/255].join() + ')';
  }
  
  var e = event.target;
  if (typeof e.type !== 'undefined' && e.type.toLowerCase() === 'password'){
    if(e.value.length > 0){
      var buffer = new TextEncoder("utf-8").encode(salt + e.value);
      crypto.subtle.digest("SHA-1", buffer).then((buf) => {
        var dw = buffer2dwords(buf);
        var xor= dw.reduce((a,b)=>a^b, 0);
        
        if(typeof e.__old_style === "undefined")
          e.__old_style = e.style;

        e.style.setProperty('background', dword2rgba(xor), 'important');
        e.style.setProperty('background-image', solidGradient(dw.map(dword2rgba)), 'important');
        e.style.setProperty('background-repeat', 'unset', 'important');
        e.style.setProperty('box-shadow', 'unset', 'important');
      });
    }else{
      e.style = e.__old_style;
      delete e.__old_style;
    }
  }
},false);
