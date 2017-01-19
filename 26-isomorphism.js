const { Either} = require('./monoids');
const { Right, Left } = Either;

const Iso = (to, from) =>
({
  to,
  from,
});

const chars = Iso(s => s.split(''), cs => cs.join(''));
console.log(chars.from(chars.to('hello world')));

const truncate = s =>
  chars.from(chars.to(s).slice(0, 3)).concat('...');

console.log(truncate('hello world'));


//[a] ~ Either a i.e. Right(a)
//[] ~ Either null i.e. Left(null)
const singleton = Iso(either => either.fold(_ => [], x => [x]),
  xs => xs.length ? Right(xs[0]) : Left(null));
  //([x]) => x ? Right(x) : Left(null));

console.log(singleton.to(Right(7)));
console.log(singleton.to(Left(null)));

console.log(singleton.from([7]));
console.log(singleton.from([0]));
console.log(singleton.from([]));

const filterEither = (either, pred) =>
  singleton.from(singleton.to(either).filter(pred))

const res = filterEither(Right('hello'), x => x.match(/h/ig))
.map(x => x.toUpperCase());

console.log(res);

const res2 = filterEither(Right('jello'), x => x.match(/h/ig))
.map(x => x.toUpperCase());

console.log(res2);
