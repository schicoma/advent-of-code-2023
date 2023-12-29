const getFirstValueByInput = (input, counter) => {
  const numbers = typeof input === 'string' ? input.match(/-?\d+/g) : input
  const uniqueNumbers = new Set(numbers)

  // console.log(uniqueNumbers, uniqueNumbers.size)
  if (uniqueNumbers.size === 1) {
    return uniqueNumbers.values().next().value
  }

  const pattern = []

  for (let i = 0; i < numbers.length - 1; i++) {
    pattern.push(numbers[i + 1] - numbers[i])
  }

  // if (counter > 100) {
  //   return 0
  // }

  const nextValue = getFirstValueByInput(pattern, ++counter);
  // console.log(pattern, nextValue)
  return +numbers[0] - nextValue
}

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  return inputs.reduce((accum, curr) => {
    const nextValue = getFirstValueByInput(curr, 0)
    return (accum += nextValue)
  }, 0)
}

module.exports = {
  process,
}

/**
 *
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
 *
 */
