const fs = require('fs');
const Task = require('data.task');
const futurize = require('futurize').futurize(Task);
const { List } = require('immutable-ext');

const readFile = futurize(fs.readFile); // lazy Task

const files = ['config.json', 'config1.json'];

const res = files.map(fileName => readFile(fileName, 'utf-8')); //[task1, task2]
res.map(task => task.fork(e => console.log(e), r => console.log(r)));

//Task[string1, string2]
const res2 = List(files).traverse(Task.of,
  fileName => readFile(fileName, 'utf-8'));

res2.fork(console.error, console.log);
