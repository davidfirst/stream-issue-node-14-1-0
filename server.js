/* eslint-disable no-console */
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
  console.log(`END TOTAL DATA ${Math.floor(size / 1024 / 1024)}MB`);
});
