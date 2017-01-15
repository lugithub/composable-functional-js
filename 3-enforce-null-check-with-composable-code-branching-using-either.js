const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

//fromNullable returns Either
const fromNullable = x =>
  x != null ? Right(x) : Left(null); //Left() may be good too

const findColor = name =>
    fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name]);

const result = findColor('red1')
  .map(c => c.slice(1))
  .fold(() => `no color` , c => c.toUpperCase());

console.log(result);
