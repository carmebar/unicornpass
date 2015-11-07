// ==UserScript==
// @name        UnicornPass
// @namespace   unicornpass
// @include     *
// @version     0.1
// @run-at      document-end
// @require     https://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==
var salt = ""; //Set manually if you want to override the generated one. USE WITH CAUTION
               //Useful to have same color outputs from different browsers/computers


if (!GM_getValue("unicorn_pass_salt", salt)){
  salt = CryptoJS.SHA1(Math.random().toString()).words.map((a)=>a.toString(16)).join('');
  GM_setValue("unicorn_pass_salt", salt);
}

salt = salt || GM_getValue("unicorn_pass_salt");

window.addEventListener("keyup",function(event){
  function solidGradient(colors){
    if(colors.length == 1) return colors[0];
    var s = 100/colors.length;

    return 'linear-gradient(to right ,' + colors.map(function(v,i){
      return v + " " + i*s + "%," + v + " " + (i+1)*s + "%"
    }).join() + ')';
  }

  function dword2rgba(i){
    return 'rgba(' + [(i>> 24) & 255, (i>> 16) & 255, (i>> 8) & 255, (i & 255)/255].join() + ')';
  }
  var e = event.target;
  if (e.type.toLowerCase() === 'password'){
    if(e.value.length > 0){
      var hash  = CryptoJS.SHA1(salt+e.value).words;
      var xor   = hash.reduce((a,b)=>a^b, 0);
      
      if(typeof e.__old_style === "undefined")
        e.__old_style = e.style;

      e.style.setProperty('background', dword2rgba(xor), 'important');
      e.style.setProperty('background-image', solidGradient(hash.map(dword2rgba)), 'important');
      e.style.setProperty('background-repeat', 'unset', 'important');
      e.style.setProperty('box-shadow', 'unset', 'important');
    }else{
      e.style = e.__old_style;
      delete e.__old_style;
    }
  }
},false);
