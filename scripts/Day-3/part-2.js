const memo = {}

const getNumberFromRow = (inputs, row) => {
  let numbers = memo[row]
  if (numbers) return numbers
  const matches = inputs[row].matchAll(/\d+/g)
  numbers = Array.from(matches)
  memo[row] = numbers
  return numbers
}

const getAdjacentNumbers = (inputs, row, index, direction = 0) => {
  const numbers = getNumberFromRow(inputs, row - direction)
  const adjacents = []
  numbers.forEach(number => {
    const value = number[0]
    if (
      (number.index + value.length === index || index === number.index - 1) ||
      (direction !== 0 && number.index <= index && index <= number.index + value.length)
    ) {
      adjacents.push(+number[0])
    }
  })

  return adjacents
}

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  // key -> row, value -> number
  console.time()

  let result = 0

  for (let row = 0; row < inputs.length; row++) {
    const matches = inputs[row].matchAll(/\*/g)
    const asterisks = Array.from(matches)

    if (!asterisks.length) {
      continue;
    }

    for (let asterisk of asterisks) {
      const adjacentNumbers = []
      const index = asterisk.index

      // above row

      if (row > 0) {
        adjacentNumbers.push(...getAdjacentNumbers(inputs, row, index, -1))
      }

      // same row
      adjacentNumbers.push(...getAdjacentNumbers(inputs, row, index))


      // below row
      if (row < inputs.length - 1) {
        adjacentNumbers.push(...getAdjacentNumbers(inputs, row, index, 1))
      }

      console.log(adjacentNumbers)
      result += adjacentNumbers.length === 2 ? adjacentNumbers[0] * adjacentNumbers[1] : 0
    }
  }
  console.log(result)
  console.timeEnd()
};


module.exports = {
  process,
};
