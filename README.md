## Issue #1. Node >= v14.1.0 hangs

The issue started since node v14.1.0.

To reproduce the issue, please run `node client.js`.

On node <= v14.0.0, the last line printed on the console is "SERVER STDOUT:  END TOTAL DATA 10MB".

On node >= 14.1.0, it never gets to the "end" event in the server.js file, as a result, the line above never gets printer.

This repo is using the SSH2 library, the client connects to the localhost, using the current user and authenticating by the ssh private key located at the home directory `~/.ssh/id_rsa`.
To change any of these assumptions just edit the constants in the first lines of client.js file.

The issue happens with a large data. If you change `strSizeInMB` variable to 1 instead of 10, it's working.

## Issue #2 Performance/Back-pressure

To reproduce, make sure your node version is <=14.0.0, then run `node client.js` a few times with different `strSizeInMB` values.

Here is what I got when tested on 1MB, 10MB and 100MB.

1MB: 0.0093 seconds. Transfer rate: 107 MB / Sec.

10MB: 0.51 seconds. Transfer rate is 19 MB / Sec.

100MB: 45 seconds. Transfer rate is 2 MB / Sec.

As you can see, it's not linear. The transfer rate decreases as data gets larger. It's probably related to the back-pressure. However, this happens also when using `pipe`, which suppose to handle the back-pressure already.
