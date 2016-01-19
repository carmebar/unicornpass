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
  if (typeof e.type !== 'undefined' && 
      e.type.toLowerCase() === 'password'){
    if(e.value.length > 0){
      self.port.emit('hashIt', e.value);
      self.port.once('hashedIt', function(hash){
          var xor   = hash.reduce((a,b)=>a^b, 0);

          if(typeof e.__old_style === "undefined")
            e.__old_style = e.style;

          e.style.setProperty('background', dword2rgba(xor), 'important');
          e.style.setProperty('background-image', solidGradient(hash.map(dword2rgba)), 'important');
          e.style.setProperty('background-repeat', 'unset', 'important');
          e.style.setProperty('box-shadow', 'unset', 'important');
      });
    }else{
      e.style = e.__old_style;
      delete e.__old_style;
    }
  }
},false);
