const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`,
});
Sum.empty = () => Sum(0);

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  chain: f => f(x),

  ap: other => other.map(x),
  
  // https://nodejs.org/dist/latest-v6.x/docs/api/util.html#util_custom_inspection_functions_on_objects
  inspect: () => `Box(${x})`,
});
Box.of = x => Box(x);

const LazyBox = g => ({
  map: f => LazyBox(() => f(g())),
  fold: f => f(g()),
});

module.exports = { Sum, Box, LazyBox };
