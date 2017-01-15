const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`,
});

const res = Sum(1).concat(Sum(2));
console.log(res);

const All = x =>
({
  x,
  concat: ({x: y}) =>
    All(x && y),
  inspect: () =>
    `All(${x})`,
});

const res2 = All(true).concat(All(false));
console.log(res2);

const First = x =>
({
  x,

  //_ is just the name of argument
  concat: _ =>
    First(x),
  inspect: () =>
    `First(${x})`,
});

const res3 = First(true).concat(First(false));
console.log(res3);
