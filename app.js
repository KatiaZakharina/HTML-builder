// const http = require('http'); // команду подключения модуля http из пакета стандартных модулей

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => { //Метод createServer() объекта http создаёт новый HTTP-сервер и возвращает его
//   res.statusCode = 200; //с помощью объекта req можно получить доступ к заголовкам запроса и к переданным в нём данным.
//   res.setHeader('Content-Type', 'text/plain');//Когда сервер будет готов, вызывается соответствующий коллбэк, сообщающий нам о том, что сервер работает.
//   res.end('Hello World'); //После этого мы завершаем подготовку ответа, добавляя его содержимое в качестве аргумента метода end():
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

//Работа с файлами
//1) Ассинхронное получение файлового дескриптора

// const fs = require('fs');
// fs.open('.gitignore', 'r', (err, fd) => {
//   console.log(err, fd);
// });

//2) Синхронный метод openSync получения файлового дескриптора  

// const fs = require('fs');
// try {
//   const fd = fs.openSync('.gitignore', 'r');
//   console.log(fd);
// } catch (err) {
//   console.error(err);
// }

//Данные о файлах

// const fs = require('fs');
// fs.stat('.gitignore', (err, stats) => {
//   if (err) {
//     console.error(err);
//     return;
//   } else{
//     console.log(stats);
//   }
// });

//по аналогии с предыдущим statSync


//размер файла, его тип

// const fs = require('fs');
// fs.stat('.gitignore', (err, stats) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(stats.isFile()); //true
//   console.log(stats.isDirectory()); //false
//   console.log(stats.isSymbolicLink()); //false
//   console.log(stats.size); //1024000 //= 1MB
// });

// const path = require('path');
// const notes=' /c/ALL/RS/HTML-builder/.gitignore';
// console.log(path.dirname(notes));
// console.log(path.basename(notes));
// console.log(path.extname(notes)); //пустое

//объединение путей
// console.log(path.join('/', 'users', 'UserName', 'notes.txt'));
// console.log(path.resolve('.gitignore')); //выведет абсолютный путь по относительному

//директории. Если при вызове этого метода передать ещё один параметр, представляющий путь к
//папке, метод использует его в качестве базы для определения абсолютного пути:
// console.log(path.resolve('tmp', '.gitignore'));
// '/Users/flavio/tmp/flavio.txt' при



//Чтение файлов
// const fs = require('fs');
// fs.readFile('.gitignore', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });




//синхронная версия
// const fs = require('fs');
// try {
//   const data = fs.readFileSync('.gitignore');
//   console.log(data);
// } catch (err) {
//   console.error(err);
// }


//Запись в файл заменой содержимого

// const fs = require('fs');
// const content = 'Some content!';
// fs.writeFile('./some.txt', content, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });

//Синхронная версия
// const fs = require('fs');
// const content = 'Some content!!!';
// try {
//   const data = fs.writeFileSync('./some.txt', content);
// } catch (err) {
//   console.error(err);
// }


//fs.appendFile() (и его синхронную версию — fs.appendFileSync() ) удобно использовать
//для присоединения данных к концу файла