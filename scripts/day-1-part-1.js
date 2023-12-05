const nameOfFile = "input-day-1.txt";

const process = (inputs) => {
  const result = inputs.reduce((accum, input) => {
    const digits = input.match(/\d/g);
    const number = digits[0] + digits[digits.length - 1];
    // console.log(accum, number)
    return accum + +number;
  }, 0);

  console.log(result);
};

module.exports = {
  process,
  nameOfFile,
};
