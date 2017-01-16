const Task = require('data.task');
const fs = require('fs');

const readFile = (fileName, encoding) =>
  new Task((rej, res) => {
    fs.readFile('config.json', 'utf-8', (err, contents) =>
      err ? rej(err) : res(contents))
    });

const writeFile = (fileName, contents) =>
  new Task((rej, res) => {
    fs.writeFile('config1.json', contents, (err, _) =>
      err ? rej(err) : res('success'))
  });

const app = () =>
  readFile('config.json', 'utf-8')
  .map(contents => contents.replace(/8/g, '6'))
  .chain(contents => writeFile('config1.json', contents));

app().fork(err => console.log(err), x => console.log(x));
