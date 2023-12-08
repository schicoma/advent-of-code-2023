const numbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const process = (inputs) => {
  const result = inputs.reduce((accum, input) => {
    // positive lookahead 
    const matches = input.matchAll(
     /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
    );
    // matchAll gets matches and groups. I only need the second one
    const digits = Array.from(matches, (match) => match[1]);

    const first = digits[0];
    const last = digits[digits.length - 1];
    const number = getNumber(first) + getNumber(last);
    return accum + +number;
  }, 0);

  console.log(result);
};

const getNumber = (number) => {
  return numbers[number] ?? number;
};

module.exports = {
  process,
};
