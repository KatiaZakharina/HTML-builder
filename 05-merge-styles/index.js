const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { rm } = require('fs/promises');

rm(path.join(__dirname, 'project-dist', 'bundle.css'), { recursive: true, force: true }, err => {
  if (err) throw err;
}).then(() => {
  readdir(path.join(__dirname, 'styles')).then(files => {
    let steamsArr = [];

    for (const file of files) {
      if (path.extname(file) == '.css') {
        const stream = new fs.ReadStream(path.join(__dirname, 'styles', file));

        steamsArr.push(
          new Promise(resolve => {
            stream.on('readable', function () {
              let data = stream.read().toString().trim();
              stream.close();
              resolve(data);
            });
          }),
        );
      }
    }
    Promise.all(steamsArr).then(styleArr => {
      styleArr.forEach(style => {
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), style, err => {
          if (err) console.error(err);
        });
      });
    });
  });
});
