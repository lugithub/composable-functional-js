const fs = require('fs');

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  chain: f => f(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
}

const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
  .chain(str => tryCatch(() => JSON.parse(str)))
  .fold(e => 3000, item => item.port);

const result = getPort();
console.log(result);
