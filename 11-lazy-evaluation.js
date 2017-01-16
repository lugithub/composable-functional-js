const { LazyBox } = require('./monoids');

const result = LazyBox(() => '  64 ')
  .map(s => s.trim())
  .map(r => parseInt(r, 10))
  .map(r => ++r)
  .fold(r => String.fromCharCode(r));

console.log(result);
