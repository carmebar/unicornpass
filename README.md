#UnicornPass
Firefox/Fennec extension. Also working on Chrome/Chromium using the GreaseMonkey script.
Colorful password fields using SHA1 hash of your password. You will know if you typed the correct password before submitting.

https://addons.mozilla.org/en-US/firefox/addon/unicornpass/
![Login Gmail](https://addons.cdn.mozilla.net/user-media/previews/full/167/167906.png)
![Android Screenshot](https://addons.cdn.mozilla.net/user-media/previews/full/167/167908.png)

##GreaseMonkey compatibility
You can use UnicornPass.user.js as a GreaseMonkey user content script. You can use TamperMonkey to use it in Chrome/Chromium.

#Multiple Browsers/Computers
You can interchange Firefox/Fennec extension with the GreaseMonkey/TamperMonkey script. The color output will be the same AS LONG as the Salt is the same. You can see the generated Salt for the Firefox/Fennec extension in the Settings panel. Add-ons->Extensions->UnicornPass->Preferences.

The salt MUST BE secret.

##Security note
If you're worried about the colors of the password field revealing information continue reading.

The colors are computed using SHA1 hash salted with a random salt calculated upon installation. That means that each installation of UnicornPass outputs different colors for the same password. If that wasn't the case someone would be able to build a table with the most common passwords and their color output (Rainbow table).
