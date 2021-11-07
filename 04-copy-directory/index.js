const fs=require('fs');
const path = require('path');
const { copyFile, mkdir, rm, readdir}=require('fs/promises');

function copyDir(origin, destination){
  rm(destination,{ recursive: true, force: true },(err) => {
    if (err) throw err;
  }).then((err)=>{
    if(err) throw err;

    mkdir(destination, { recursive: true }, (err) => {
      if (err) throw err;
    });
    readdir(origin).then(files => {
      for (const file of files) {
        try {
          fs.stat(path.join(origin, file), (err, stats) => {
            if (stats.isDirectory()) {
              copyDir(path.join(origin, file), path.join(destination, file));
            } else{
              copyFile(path.join(origin, file), path.join(destination, file));
            }
          });
        } catch {
          console.log('The file could not be copied');
        }
      }
    });
  });
}
copyDir(path.join(__dirname,'files') ,path.join(__dirname,'files-copy'));