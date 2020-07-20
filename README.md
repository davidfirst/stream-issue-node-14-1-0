The issue started since node v14.1.0.

To reproduce the issue, please run `node client.js`.

On node <= v14.0.0, the last line printed on the console is "SERVER STDOUT:  END TOTAL DATA 10MB".

On node >= 14.1.0, it never gets to the "end" event in the server.js file, as a result, the line above never gets printer.

This repo is using the SSH2 library, the client connects to the localhost, using the current user and authenticating by the ssh private key located at the home directory `~/.ssh/id_rsa`.
To change any of these assumptions just edit the constants in the first lines of client.js file.

The issue happens with a large data. If you change `strSizeInMB` variable to 1 instead of 10, it's working.