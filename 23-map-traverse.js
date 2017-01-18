const Task = require('data.task');
const { Map, List } = require('immutable-ext');

const httpGet = (path, params) =>
  Task.of(`${path} result`);

const res = Map({home: '/', about: '/about'})
  .map(route => httpGet(route));
//route is the value, e.g. '/', '/about'
//.map returns another value of Map

//Map({home: task1, about: task2})
console.log(res);

const res2 = Map({home: '/', about: '/about'})
  .traverse(Task.of, route => httpGet(route));

//Task(Map({home: '/ result', about: '/about result'}))
console.log(res2);

res2.fork(console.error, console.log);

//nested structure

const res3 = Map({home: ['/', '/home'], about: ['/about']})
  .traverse(Task.of, routes =>
      List(routes).traverse(Task.of, route => httpGet(route)));

// Task(
//   Map {
//     "home": List [ "/ result", "/home result" ],
//     "about": List [ "/about result" ]
//   }
// )

console.log(res3);

res3.fork(console.error, console.log);
