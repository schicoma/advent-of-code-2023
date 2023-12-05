const nameOfFile = "test.txt";
// const nameOfFile = "input-day-3.txt";

const maxAmount = {
  red: 12,
  green: 13,
  blue: 14,
};

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  let result = 0;
  for (let i = 0; i < inputs.length; i++) {
    const matchesAll = Array.from(inputs[i].matchAll(/(\*)/g));

    matchesAll.forEach((match) => {
      const ocurrence = match[0];
      const up = inputs[i - 1]?.substring(
        match.index - 1,
        match.index + ocurrence.length + 1
      );

      const down = inputs[i + 1]?.substring(
        match.index - 1,
        match.index + ocurrence.length + 1
      );

      const left = inputs[i][match.index - 1];
      const right = inputs[i][match.index + ocurrence.length];
      if (
        checkIfContainsNumber(up) ||
        checkIfContainsNumber(down) ||
        checkIfContainsNumber(left) ||
        checkIfContainsNumber(right)
      ) {
        console.log(match, i+1);
        return;
      }
    });
  }

  console.log(result);
};

const checkIfContainsNumber = (string) => {
  if (!string) {
    return false;
  }
  return !!string.match(/[\d]/g)?.length;
};

module.exports = {
  process,
  nameOfFile,
};
