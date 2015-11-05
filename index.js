let {Cc, Ci}        = require('chrome');
const{prefs}        = require("sdk/simple-prefs");
var uuidGenerator   = Cc["@mozilla.org/uuid-generator;1"]
                    .getService(Ci.nsIUUIDGenerator);
var ch              = Cc["@mozilla.org/security/hash;1"]
                    .getService(Ci.nsICryptoHash);
var conv            = Cc["@mozilla.org/intl/scriptableunicodeconverter"]
                    .getService(Ci.nsIScriptableUnicodeConverter);

function SHA1toDWORDS(bytes){
  var dw;
  var r = [];
  for (var i = 0; i < bytes.length; i+=4){
    dw = bytes.charCodeAt(i+3) << 0;
    dw+= bytes.charCodeAt(i+2) << 8;
    dw+= bytes.charCodeAt(i+1) << 16;
    dw+= bytes.charCodeAt(i+0) << 24;
    r.push(dw);
  }
  return r;
}

exports.main = function(opt, callbacks){
  if (opt.loadReason === "install")
    prefs['salt'] = uuidGenerator.generateUUID().toString();

  require("sdk/page-mod").PageMod({
    include:              "*",
    contentScriptFile:    './unicornpass.js',
    contentScriptWhen:    "ready",
    onAttach: function(worker){
      worker.port.on('hashIt', function(pass){
        ch.init(ch.SHA1);
        var sdata = prefs['salt'] + pass;

        conv.charset = "UTF-8";
        var result = {};
        var bdata = conv.convertToByteArray(sdata, result);

        ch.update(bdata, bdata.length);
        worker.port.emit('hashedIt', SHA1toDWORDS(ch.finish(false)));
      });
    }
  });
};
