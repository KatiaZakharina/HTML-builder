const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const rootPath = path.join(__dirname, 'secret-folder');

try {
  readdir(rootPath).then(files => {
    for (const file of files) {
      const filepath = path.join(__dirname, 'secret-folder', file);
      fs.stat(filepath, (err, stats) => {
        if (stats.isFile()) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(
            `${path.basename(filepath, path.extname(filepath))}\t-\t${path
              .extname(filepath)
              .slice(1)}\t-\t${(stats.size / 1024).toFixed(3)}kb`,
          );
        }
      });
    }
  });
} catch (err) {
  console.error(err);
}
