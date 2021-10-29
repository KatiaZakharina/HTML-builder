const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const filepath = path.join(__dirname, 'text.txt');
const stream = new fs.ReadStream(filepath);

stream.on('readable', function () {
  let data = stream.read().toString().trim();
  stdout.write(data);
  process.exit();
});
