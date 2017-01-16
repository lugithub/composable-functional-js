const { List, Map } = require('immutable-ext');
const { Sum } = require('./monoids');

const res = List.of(Sum(1), Sum(2), Sum(3)).fold(Sum.empty());
console.log(res);

const res2 = List.of().fold(Sum.empty());
console.log(res2);

const res3 = List.of(1, 2, 3).foldMap(Sum, Sum.empty());
console.log(res3);

const res4 = Map({brian: Sum(3), sara: Sum(5)}).fold(Sum.empty());
console.log(res4);

const res5 = Map({brian: 3, sara: 5}).foldMap(Sum, Sum.empty());
console.log(res5);
