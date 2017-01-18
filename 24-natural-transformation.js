const { Either, Box } = require('./monoids');
const { Right, Left, fromNullable } = Either;
const Task = require('data.task');

const eitherToTask = either =>
  either.fold(Task.rejected, Task.of);

eitherToTask(Right('hi')).fork(console.error, console.log);

eitherToTask(Left('err')).fork(console.error, console.log);


const boxToEither = box =>
  //same box.chain(Right); but chain may be better since chain is expected
  //to return value of a functor.
  box.fold(Right);

const res = boxToEither(Box(7));

console.log(res);


const first = xs =>
  fromNullable(xs[0]);

const res1 = first([1, 2, 3]).map(r => r * 100);
const res2 = first([1, 2, 3].map(r => r * 100));
console.log(res1, res2);
