const mcmMultiple = (numbers) => {
  return numbers.reduce((acum, curr) => { return mcm(curr, acum) }, 1)
}

const mcm = (a, b) => {
  return a * b / mcd(a, b)
}

const mcd = (a, b) => {
  return b === 0 ? a : mcd(b, a % b)
}

/** 
 * 
 * @param {string[]} inputs 
 */
const process = (inputs) => {
  const currentSteps = []
  const directions = inputs[0].trim()
  const network = {}

  // building network
  for (let i = 2; i < inputs.length; i++) {
    const [node, left, right] = inputs[i].match(/[A-Z0-9]+/g)
    network[node] = [left, right]

    if (node.endsWith('A')) {
      currentSteps.push(node)
    }
  }

  console.log(currentSteps)

  let result = 1

  for (let i = 0; i < currentSteps.length; i++) {
    let currentStep = currentSteps[i]
    let isGoalReached = false
    let steps = 1

    while (!isGoalReached) {
      for (let j = 0; j < directions.length; j++) {
        const direction = directions[j]

        currentStep = network[currentStep][direction === 'L' ? 0 : 1]

        if (currentStep.endsWith('Z')) {
          isGoalReached = true
          break;
        }

        steps++
      }
    }

    result = mcm(result, steps)
  }


  return result
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