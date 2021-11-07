const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { rm } = require('fs/promises');

function mergeStyles(entry, output){
  rm(output, { recursive: true, force: true }, err => {
    if (err) throw err;
  }).then(() => {
    readdir(entry).then(files => {
      let steamsArr = [];
  
      for (const file of files) {
        if (path.extname(file) == '.css') {
          const stream = new fs.ReadStream(path.join(entry, file));
  
          steamsArr.push(
            new Promise(resolve => {
              stream.on('readable', function () {
                let data = stream.read().toString();
                stream.close();
                resolve(data);
              });
            }),
          );
        }
      }
      Promise.all(steamsArr).then(styleArr => {
        styleArr.forEach(style => {
          fs.appendFile(output, style, err => {
            if (err) console.error(err);
          });
        });
      });
    });
  });
}
mergeStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'bundle.css'));
module.exports=mergeStyles;