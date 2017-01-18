const { List } = require('immutable-ext');

const res = List.of(x => x).ap(List([1, 2, 3]));

console.log(res);

const res2 = List.of(x => y => z => `${x}-${y}-${z}`)
  .ap(List(['tshirt', 'sweater']))
  .ap(List(['large', 'medium', 'small']))
  .ap(List(['black', 'white']));

console.log(res2);
