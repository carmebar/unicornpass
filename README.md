# UnicornPass
WebExtension compatible add-on. Tested on Chrome, Firefox and Opera.
Colorful password fields using SHA1 hash of your password. You will know if you typed the correct password before submitting.

https://addons.mozilla.org/en-US/firefox/addon/unicornpass/

![Login Gmail](https://addons.cdn.mozilla.net/user-media/previews/full/167/167906.png)
![Android Screenshot](https://addons.cdn.mozilla.net/user-media/previews/full/167/167908.png)
![WebExtensions Screenshot](https://addons.cdn.mozilla.net/user-media/previews/full/186/186758.png)

# Multiple browsers
You can use UnicornPass on different browsers and/or devices and have the same color output for the same password. To achieve this you have to set the same salt on each device.
The recommend approach is to copy one of the generated hashes from one device to the rest of them.
The salt MUST BE secret.

## But isn't SHA1 insecure??!!1! a.k.a Security notes
Are you worried that the colors of the password field are leaking information about your password? Fear you not.

The colors are computed using the SHA1 hash of your password salted with a random salt calculated upon installation. 
That means that each installation of UnicornPass outputs different colors for the same password. 
If that wasn't the case an attacker that has been able to get a proper color representation (a huge problem on its own) would be able to build a table with passwords and their color output (Rainbow table).

### Why not SHA256?
Even MD5 would suffice. The hash function required for this application doesn't need to have collision resistance. The biggest problem of having a collision would be that the user would submit a wrong password. The only properties that we need from the hash function are that its deterministic and infeasible to get the original message (password) from the output (colors).

### Shouldn't your password manager be filling the password for you?
Yes.

Ideally you should set up a password manager and let it generate and save your credentials securely and sync your master keys/seeds between devices. However some edge cases exist and having a proper configuration is not easy.

