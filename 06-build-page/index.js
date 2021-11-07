/**
 * @prettier
 */
const fs = require('fs');
const path = require('path');
const copyDir = require('../04-copy-directory/index');
const mergeStyles = require('../05-merge-styles/index');
const { readdir, mkdir, rm, readFile } = require('fs/promises');

rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, err => {
  if (err) throw err;
}).then(() => {
  mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
  });

  readdir(path.join(__dirname, 'assets')).then(dirs => {
    for (const dir of dirs) {
      mkdir(path.join(__dirname, 'project-dist', 'assets', dir), { recursive: true }, err => {
        if (err) throw err;
      });
      copyDir(
        path.join(__dirname, 'assets', dir),
        path.join(__dirname, 'project-dist', 'assets', dir),
      );
    }
  });
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

