/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  let result = 0;
  for (let i = 0; i < inputs.length; i++) {
    const matchesAll = Array.from(inputs[i].matchAll(/(\d+)/g));

    matchesAll.forEach((match) => {
      const number = match[0];
      const up = inputs[i - 1]?.substring(
        match.index - 1,
        match.index + number.length + 1
      );

      const down = inputs[i + 1]?.substring(
        match.index - 1,
        match.index + number.length + 1
      );

      const left = inputs[i][match.index - 1];
      const right = inputs[i][match.index + number.length];
      if (
        checkIfContainsSymbols(up) ||
        checkIfContainsSymbols(down) ||
        checkIfContainsSymbols(left) ||
        checkIfContainsSymbols(right)
      ) {
        console.log(number);
        result += +number;
        return;
      }
    });
  }

  console.log(result);
};

const checkIfContainsSymbols = (string) => {
  if (!string) {
    return false;
  }
  return !!string.match(/[^\w.]/g)?.length;
};

module.exports = {
  process,
};
