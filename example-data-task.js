const Task = require('data.task');

const result = Task.of(x => y => x + y).ap(Task.of(1)).ap(Task.of(6));

result.fork(console.error, console.log);

//two ap calls run synchronously including the code in Task constructors.

const result2 = Task.of(x => y => x + y)
.ap(new Task((rej, res) => {
  console.log('Task (1) ctor');
  setTimeout(_ => res(1), 3000);
}))
.ap(new Task((rej, res) => {
  console.log('Task (6) ctor');
  res(6);
}));

result2.fork(console.error, console.log);
