const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filepath = path.join(__dirname, 'output.txt');

const readlineSteam = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter some text:\n'
});

readlineSteam.prompt();

fs.open(filepath, 'w', (err)=> {
  if (err) throw err;
});


readlineSteam.on('line', (line) => {
  switch (line.trim()) {
  case 'exit':
    readlineSteam.close();
    break;
  default:
    fs.appendFile( filepath, line.trim()+'\n', err => {
      if (err) console.error(err);
    });
    break;
  }
}).on('close', () => {
  console.log('Have a great day!');
});