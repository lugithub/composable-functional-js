const { Map }  = require('immutable');

const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`,
});

const All = x =>
({
  x,
  concat: ({x: y}) =>
    All(x && y),
  inspect: () =>
    `All(${x})`,
});

const First = x =>
({
  x,

  //_ is just the name of argument
  concat: _ =>
    First(x),
  inspect: () =>
    `First(${x})`,
});

//how to foldMap so it works with
//Map({name: 'Nico', isPaid: true, points: 10, friends: ['franklin']}) ?
const acct1 = Map({name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['franklin']});
const acct2 = Map({name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['katherin', 'rahe']});
const res = acct1.concat(acct2);
console.log(res.toJS());
