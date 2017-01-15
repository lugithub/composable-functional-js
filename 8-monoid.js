const { Map }  = require('immutable');

const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`,
});

Sum.empty = () => Sum(0);

const All = x =>
({
  x,
  concat: ({x: y}) =>
    All(x && y),
  inspect: () =>
    `All(${x})`,
});

All.empty = () => All(true);

const First = x =>
({
  x,

  //_ is just the name of argument
  concat: _ =>
    First(x),
  inspect: () =>
    `First(${x})`,
});
