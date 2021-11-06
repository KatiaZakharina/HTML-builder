const { copyFile }=require('fs/promises');
const { readdir } = require('fs/promises');
const path = require('path');
const { mkdir, rm}=require('fs/promises');

function copyDir(){
  rm(path.join(__dirname,'files-copy'),{ recursive: true, force: true },(err) => {
    if (err) throw err;
  }).then((err)=>{
    if(err) throw err;

    mkdir(path.join(__dirname,'files-copy'), { recursive: true }, (err) => {
      if (err) throw err;
    });
    readdir(path.join(__dirname,'files')).then(files => {
      for (const file of files) {
        try {
          copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
        } catch {
          console.log('The file could not be copied');
        }
      }
    });
  });
}
copyDir();