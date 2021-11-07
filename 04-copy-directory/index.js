const { copyFile }=require('fs/promises');
const { readdir } = require('fs/promises');
const path = require('path');
const { mkdir, rm}=require('fs/promises');

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
          copyFile(path.join(origin, file), path.join(destination, file));
        } catch {
          console.log('The file could not be copied');
        }
      }
    });
  });
}
copyDir(path.join(__dirname,'files') ,path.join(__dirname,'files-copy'));
module.exports=copyDir;