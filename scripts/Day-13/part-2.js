const getPatterns = (inputs) => {
  const patterns = []
  const pattern = []

  for (let input of inputs) {
    if (!input.trim().length) {
      patterns.push([...pattern])
      pattern.length = 0
      continue
    }

    pattern.push(input.trim())
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

  // console.log(rotatedMatrix.join('\r\n'))

  return rotatedMatrix
}

const compare = (a, b, skip) => {
  if (a === b) {
    return { result: true, smudgeFound: false }
  }

  if (skip) {
    return { result: false, smudgeFound: true }
  }

  const numberA = a.replaceAll(/[.]/g, '0').replaceAll(/[#]/g, '1')
  const numberB = b.replaceAll(/[.]/g, '0').replaceAll(/[#]/g, '1')

  // XOR
  const xor = parseInt(numberA, 2) ^ parseInt(numberB, 2)
  const ones = xor.toString(2).match(/[1]/g)

  // only one "one" needs to be in the array
  // if (ones?.length === 1) {
  //   console.log('ones', a, b, numberA, numberB, xor)
  // }
  return { result: ones?.length === 1, smudgeFound: ones?.length === 1 }
}

const isReflectionValid = (inputs, index, smudgeFound) => {
  let rowBefore = index - 1
  let rowAfter = index + 2

  let isValid = true

  while (0 <= rowBefore && rowAfter < inputs.length) {
    const comparison = compare(inputs[rowBefore], inputs[rowAfter], smudgeFound)
    if (!smudgeFound) {
      smudgeFound = comparison.smudgeFound
    }

    if (!comparison.result) {
      isValid = false
      break
    }

    rowBefore--
    rowAfter++
  }

  return { result: isValid, smudgeFound }
}

const getCalculationOfReflection = (matrix, direction, index) => {

  let smudgeFound = false
  let indexReflection = undefined
  for (let i = 0; i < matrix.length - 1; i++) {
    const comparison = compare(matrix[i], matrix[i + 1], smudgeFound)
    if (!smudgeFound) {
      smudgeFound = comparison.smudgeFound
    }

    if (!comparison.result) {
      continue
    }

    const isReflectionValidComparison = isReflectionValid(
      matrix,
      i,
      smudgeFound
    )
    if (!smudgeFound) {
      smudgeFound = isReflectionValidComparison.smudgeFound
    }

    if (isReflectionValidComparison.result) {
      if (!smudgeFound) {
        continue
      }

      indexReflection = i
      break
    }

    smudgeFound = false
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
    indexReflection = getCalculationOfReflection(matrix, 'h', index)
    if (indexReflection !== undefined) {
      console.log(index + 1, indexReflection, 'horizontal', (indexReflection + 1) * 100)
      return accum + (indexReflection + 1) * 100
    }

    // vertical
    const rotatedMatrix = getRotatedMatrix(matrix)
    indexReflection = getCalculationOfReflection(rotatedMatrix, 'v', index)
    if (indexReflection !== undefined) {
      console.log(index + 1, indexReflection, 'vertical', indexReflection + 1)
      return accum + (indexReflection + 1)
    }

    console.log('ALERTAAAAAAAA', index + 1)

    return accum + 0
  }, 0)
}

module.exports = {
  process,
}
