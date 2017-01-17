const add = x => (y => x + y);

console.log(add(1)(2));

const moduleo = dvr => dvd => dvd % dvr;
const isOdd = moduleo(2)

console.log(isOdd(11));

const filter = pred => (xs => xs.filter(pred));
const res = filter(isOdd)([1, 2, 3, 4, 5]);

console.log(res);

const replace = regex => repl => str =>
  str.replace(regex, repl);

const res2 = replace(/[aeiou]/ig)('*')('hello world!');

console.log(res2);

const map = pred => (xs => xs.map(pred));

const res3 = map(replace(/[aeiou]/ig)('*'))(['hello', 'world']);

console.log(res3);
