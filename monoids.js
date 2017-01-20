const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`,
});
Sum.empty = () => Sum(0);

const Pair = (x, y) =>
  ({
    x,
	  y,
    concat: ({x: x1, y: y1}) =>
      Pair(x.concat(x1), y.concat(y1)),

    toList: _ => [x, y], //natural transformation
    bimap: (f, g) => Pair(f(x), g(y)),
	});

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

//const Either = Right || Left

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),

  ap: other => other.map(x),

  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),

  ap: other => Left(x),

  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x =>
 x != null ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

let Either = {}

Either.rejected = a => Left(a)
Either.of = a => Right(a)
Either.Right = Right;
Either.Left = Left;
Either.fromNullable = fromNullable

module.exports = Either
module.exports = { Sum, Box, LazyBox, Either, Pair};
