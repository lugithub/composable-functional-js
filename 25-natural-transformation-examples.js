const { Either, Box } = require('./monoids');
const { Right, Left, fromNullable } = Either;
const { List } = require('immutable');
const Task = require('data.task');

//List is a natural transformation
const res = List(['hello', 'world'])
.chain(x => List(x.split('')));

//List [ "h", "e", "l", "l", "o", "w", "o", "r", "l", "d" ]
console.log(res);

//first is a natural transformation
const first = xs =>
  fromNullable(xs[0]);

const largeNumbers = xs =>
  xs.filter(x => x > 100);

const larger = x =>
  x * 100;

const app = xs =>
  first(largeNumbers(xs).map(larger));

console.log(app([2, 400, 1000]));

const app2 = xs =>
  first(largeNumbers(xs)).map(larger);

console.log(app2([2, 400, 1000]));

//eitherToTask is a natural transformation
const eitherToTask = either =>
  either.fold(Task.rejected, Task.of);

const fake = id =>
  ({
    id,
    name: `user ${id}`,
    bestFriendId: id + 1,
  });

const Db = ({
  find: id =>
    new Task((rej, res) =>
      res(id > 2 ? Right(fake(id)) : Left('not found')))
});

const res1 = Db.find(3) //Task(Right(fake))
.chain(eitherToTask) //Task(fake)
.chain(fake =>
    Db.find(fake.bestFriendId)) //Task(Right(fake))
.chain(eitherToTask); //Task(fake)

res1.fork(console.error, console.log);
