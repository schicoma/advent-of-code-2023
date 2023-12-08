/**
 * 
 * @param {string[]} inputs 
 */
const process = (inputs) => {
  const goal = 'ZZZ'
  const directions = inputs[0].trim()
  const network = {}

  // building network
  for (let i = 2; i < inputs.length; i++) {
    const [node, nextElements] = inputs[i].split(' = ')
    network[node] = nextElements.match(/[A-Z]+/g)
  }

  let current = 'AAA'
  let isGoalReached = false
  let steps = 1

  while (!isGoalReached) {

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i]

      current = network[current][direction === 'L' ? 0 : 1]
      console.log(current, direction, steps )
      if (current === goal) {
        isGoalReached = true
        break;
      }

      steps++
    }
  }

  return steps
};

module.exports = {
  process,
};

/**
 * 
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
 *
 */