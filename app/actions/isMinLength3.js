function isMinLength3({input, output}) {
  if (input.query.length < 3) {
    output.false();
  } else {
    output.true();
  }
}

isMinLength3.outputs = ['true', 'false'];

export default isMinLength3;
