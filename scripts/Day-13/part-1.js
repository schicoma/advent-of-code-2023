const getPatterns = (inputs) => {
  const patterns = []
  const pattern = []

  for (let input of inputs) {
    if (!input.trim().length) {
      patterns.push([...pattern])
      pattern.length = 0
      continue
    }

    pattern.push(input)
  }

  patterns.push([...pattern])

  return patterns
}

const getRotatedMatrix = (inputs) => {
  const rotatedMatrix = []
  const row = []

  // 4 row x 3 col => 3 row x 4 col
  for (let i = 0; i < inputs[0].length; i++) {
    for (let j = inputs.length - 1; j >= 0; j--) {
      row.push(inputs[j][i])
    }

    rotatedMatrix.push(row.join(''))
    row.length = 0
  }

  return rotatedMatrix
}

const compare = (a, b) => {
  return a === b
}

const isReflectionValid = (inputs, index) => {
  // console.log(index)
  let rowBefore = index - 1
  let rowAfter = index + 2

  let isValid = true

  while (0 <= rowBefore && rowAfter < inputs.length) {
    if (!compare(inputs[rowBefore], inputs[rowAfter])) {
      isValid = false
      break
    }

    rowBefore--
    rowAfter++
  }

  return isValid
}

const getCalculationOfReflection = (matrix) => {
  // console.log(matrix.join('\r\n'))
  let indexReflection = undefined
  for (let i = 0; i < matrix.length - 1; i++) {
    if (!compare(matrix[i], matrix[i + 1])) {
      continue
    }

    if (isReflectionValid(matrix, i)) {
      indexReflection = i
      break
    }
  }

  return indexReflection
}

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  const patterns = getPatterns(inputs)

  return patterns.reduce((accum, matrix, index) => {
    let indexReflection = undefined

    // horizontal
    indexReflection = getCalculationOfReflection(matrix)
    if (indexReflection !== undefined) {
      console.log(
        index + 1,
        indexReflection,
        'horizontal',
        (indexReflection + 1) * 100
      )
      return accum + (indexReflection + 1) * 100
    }

    // vertical
    const rotatedMatrix = getRotatedMatrix(matrix)
    indexReflection = getCalculationOfReflection(rotatedMatrix)
    if (indexReflection !== undefined) {
      console.log(index + 1, indexReflection, 'vertical', indexReflection + 1)
      return accum + (indexReflection + 1)
    }

    return accum + 0
  }, 0)
}

module.exports = {
  process,
}
