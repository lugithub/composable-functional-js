const { Box } = require('./monoids');

const res = Box(x => x + 1).ap(Box(2));

console.log(res);

const res2 = Box(x => y => x + y).ap(Box(2)).ap(Box(3));

console.log(res2);

const liftA2 = (f, fx, fy) =>
  fx.map(f).ap(fy);

const res3 = liftA2(x => y => x + y, Box(2), Box(3));

console.log(res2);
