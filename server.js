/* eslint-disable no-console */
const { performance } = require('perf_hooks');

const t0 = performance.now();
let data = '';
process.stdin.on('data', (chunk) => {
  data += chunk.toString();
  const size = chunk.byteLength;
  console.log(`DATA ${size}B. ${Math.floor(size / 1024)}KB`);
});

// an alternative, use non-flowing mode
// process.stdin.on('readable', () => {
//   let chunk;
//   while (null !== (chunk = process.stdin.read())) {
//     const size = chunk.length;
//     console.log(`DATA ${size}B. ${Math.floor(size / 1024)}KB`);
//     data += chunk.toString();
//   }
// });

process.stdin.on('end', () => {
  const size = data.length;

  const t1 = performance.now();
  const timeInSeconds = (t1 - t0) / 1000;
  console.log(`END. took ${timeInSeconds.toPrecision(2)} seconds.`);
  console.log(`END. transfer rate is ${Math.floor(size / 1024 / 1024 / timeInSeconds)} MB / Sec`);

  console.log(`END. TOTAL DATA ${Math.floor(size / 1024 / 1024)}MB`);
});
