/* eslint-disable no-console */
const os = require('os');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { Client } = require('ssh2');

const USERNAME = os.userInfo().username;
const PRIVATE_KEY_PATH = `${os.userInfo().homedir}/.ssh/id_rsa`;
const SERVER_PATH = path.join(__dirname, 'server.js');

const strSizeInMB = 10;
const MB = 1024 * 1024;
const hugeStr = new Array((strSizeInMB * MB) + 1).join('a');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready. node version', process.version);
  conn.exec(`node ${SERVER_PATH}`, (err, stream) => {
    if (err) throw err;

    stream.stdin.write(hugeStr);
    stream.stdin.end();
    // an alternative, to avoid back-pressure
    // Readable.from(hugeStr).pipe(stream.stdin);

    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ', code, ', signal: ', signal);
      conn.end();
    }).on('data', (data) => {
      console.log('SERVER STDOUT: ', data.toString());
    }).stderr.on('data', (data) => {
      console.log('SERVER STDERR: ', data.toString());
    });
  });
}).connect({
  host: '127.0.0.1',
  port: 22,
  username: USERNAME,
  privateKey: fs.readFileSync(PRIVATE_KEY_PATH),
});
