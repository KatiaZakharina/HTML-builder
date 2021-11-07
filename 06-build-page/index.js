const fs = require('fs');
const path = require('path');
const { readdir, mkdir, rm, readFile, copyFile } = require('fs/promises');


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

rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, err => {
  if (err) throw err;
}).then(() => {
  mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
  });

  copyDir(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist', 'assets'),
  );

  mergeStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'style.css'));
  
  
  const stream = new fs.ReadStream(path.join(__dirname, 'template.html'));
  stream.on('data', async (template) => {
    template=template.toString();
  
    await replacer(template.match(/{{(.*)}}/g));
  
    fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), template, err => {
      if (err) console.error(err);
    });
  
    async function replacer(matches){
      for(let match of matches){      
        let component=await readFile((path.join(__dirname, 'components', match.slice(2, -2)+'.html')));
        template=template.replace(match, component);
      }    
    }
    stream.close();
  });
  
});

