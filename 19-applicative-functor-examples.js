const { Either } = require('./monoids');

const liftA2 = (f, fx, fy) =>
  fx.map(f).ap(fy);

const $ = selector =>
  Either.of({
    selector,
    height: 10,
  });

const getScreenSize = screen => header => footer =>
  screen - header.height - footer.height;

//screen is just a number
//header and footer are functors

const res = liftA2(getScreenSize(800), $('head'), $('foot'))
  //.fold(e => console.log(e), r => console.log(r));

console.log(res);
