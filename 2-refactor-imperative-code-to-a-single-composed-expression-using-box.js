const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),

  // https://nodejs.org/dist/latest-v6.x/docs/api/util.html#util_custom_inspection_functions_on_objects
  inspect: () => `Box(${x})`,
});

const moneyToFloat = str =>
  Box(str).map(str => str.replace(/\$/g, ''))
  .map(str => parseFloat(str));

const percentToFloat = str =>
  Box(str).map(str => str.replace(/\%/g, ''))
  .map(str => parseFloat(str))
  .map(r => r * 0.01);

const applyDiscount = (price, discount) =>
  moneyToFloat(price)
  .fold(cost =>
    percentToFloat(discount)
    .fold(savings => (1 - savings) * cost)
  );

const result = applyDiscount('$5', '20%');
console.log(result);
