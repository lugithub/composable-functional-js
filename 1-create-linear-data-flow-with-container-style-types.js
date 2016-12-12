const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),

  // https://nodejs.org/dist/latest-v6.x/docs/api/util.html#util_custom_inspection_functions_on_objects
  inspect: () => `Box(${x})`,
});

const result = Box('  64 ')
  .map(s => s.trim())
  .map(r => parseInt(r, 10))
  .map(r => ++r)
  .fold(r => String.fromCharCode(r));

console.log(result);
