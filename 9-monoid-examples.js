const { List}  = require('immutable-ext');

const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`,
});

Sum.empty = () => Sum(0);

const res = List([1,2,3]).foldMap(Sum, Sum.empty());
const res2 = List([]).foldMap(Sum, Sum.empty());

console.log(res, res2);

const Product = x =>
({
  x,
  concat: ({x: y}) =>
    Product(x * y),
  inspect: () =>
    `Product(${x})`,
});

Product.empty = () => Product(1);

const res3 = List([1,2,3]).foldMap(Product, Product.empty());
const res4 = List([]).foldMap(Product, Product.empty());

console.log(res3, res4);

const Any = x =>
({
  x,
  concat: ({x: y}) =>
    Any(x || y),
  inspect: () =>
    `Any(${x})`,
});

Any.empty = () => Any(false);

const res5 = List([false, true, false]).foldMap(Any, Any.empty());
const res6 = List([]).foldMap(Any, Any.empty());

console.log(res5, res6);

const All = x =>
({
  x,
  concat: ({x: y}) =>
    All(x && y),
  inspect: () =>
    `All(${x})`,
});

All.empty = () => All(true);

const res7 = List([false, true, true]).foldMap(All, All.empty());
const res8 = List([]).foldMap(All, All.empty());

console.log(res7, res8);

const Right = x =>
({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  concat: other =>
    other.fold(e => Left(e),
                //x and r have to be a semigroup value
                //e.g. Sum(40)
               r => Right(x.concat(r))),
  isLeft: false,
  inspect: () =>
    `Right(${x})`,
});

//Right.empty cannot be defined

const Left = x =>
({
  map: f => Left(x),
  fold: (f, g) => f(x),
  concat: other => Left(x),
  isLeft: true,
  inspect: () =>
    `Left(${x})`,
});

//Left.empty cannot be defined

const fromNullable = x =>
  x != null ? Right(x) : Left('aaa');

const res9 = List.of({page: 'home', views: 40},
{page: 'home', views: 10},
{page: 'home'}).foldMap(item => fromNullable(item.views).map(Sum),
  Right(Sum.empty()));

const res10 = res9.fold(() => 'error', r => r);

console.log(res10);

const res11 = List([]).foldMap(item => fromNullable(item.views).map(Sum),
  Right(Sum.empty()));

const res12 = res11.fold(() => 'error', r => r);

console.log(res12);

const First = either =>
({
  //fold is not Either.fold
  fold: f => f(either),
  concat: other =>
    either.isLeft ? other : First(either),
  inspect: () =>
    `First(${either})`,
});

First.empty = () => First(Left());

List([3,4,5,6,7]).foldMap(item => First((x => x > 4)(item) ? Right(item) : Left()),
  First.empty()).fold(either => console.log(either));

List([3,4,5,6,7]).foldMap(item => First((x => x > 8)(item) ? Right(item) : Left()),
    First.empty()).fold(either => console.log(either));

const Pair = (x, y) =>
({
  x,
  y,
  concat: ({x: x1, y: y1}) =>
    Pair(x.concat(x1), y.concat(y1)),
});
