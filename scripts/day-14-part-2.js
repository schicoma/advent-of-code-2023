const tiltNorth = (matrix) => {
  for (let j = 0; j < matrix.length; j++) {
    let indexPoints = []

    for (let i = 0; i < matrix[0].length; i++) {
      if ('#' === matrix[i][j]) {
        indexPoints = indexPoints.filter((index) => index > i)
      }

      if ('.' === matrix[i][j]) {
        indexPoints.push(i)
      }

      if ('O' === matrix[i][j]) {
        if (!indexPoints.length) {
          continue
        }

        const firstPoint = indexPoints.splice(0, 1)
        matrix[firstPoint][j] = 'O'
        matrix[i][j] = '.'

        indexPoints.push(i)
      }
    }
  }
}

const tiltSouth = (matrix) => {
  for (let j = 0; j < matrix.length; j++) {
    let indexPoints = []

    for (let i = matrix[0].length - 1; i >= 0; i--) {
      if ('#' === matrix[i][j]) {
        indexPoints = indexPoints.filter((index) => index < i)
      }

      if ('.' === matrix[i][j]) {
        indexPoints.push(i)
      }

      if ('O' === matrix[i][j]) {
        if (!indexPoints.length) {
          continue
        }

        const firstPoint = indexPoints.splice(0, 1)
        matrix[firstPoint][j] = 'O'
        matrix[i][j] = '.'

        indexPoints.push(i)
      }
    }
  }
}

const tiltWest = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    let indexPoints = []

    for (let j = 0; j < matrix[0].length; j++) {
      if ('#' === matrix[i][j]) {
        indexPoints = indexPoints.filter((index) => index > j)
      }

      if ('.' === matrix[i][j]) {
        indexPoints.push(j)
      }

      if ('O' === matrix[i][j]) {
        if (!indexPoints.length) {
          continue
        }

        const firstPoint = indexPoints.splice(0, 1)
        matrix[i][firstPoint] = 'O'
        matrix[i][j] = '.'

        indexPoints.push(j)
      }
    }
  }
}

const tiltEast = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    let indexPoints = []

    for (let j = matrix[0].length - 1; j >= 0; j--) {
      if ('#' === matrix[i][j]) {
        indexPoints = indexPoints.filter((index) => index < j)
      }

      if ('.' === matrix[i][j]) {
        indexPoints.push(j)
      }

      if ('O' === matrix[i][j]) {
        if (!indexPoints.length) {
          continue
        }

        const firstPoint = indexPoints.splice(0, 1)
        matrix[i][firstPoint] = 'O'
        matrix[i][j] = '.'

        indexPoints.push(j)
      }
    }
  }
}

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  const matrix = []
  inputs.forEach((input) => matrix.push(input.split('')))

  const loads = []

  // build cycles
  while (true) {
    tiltNorth(matrix)
    tiltWest(matrix)
    tiltSouth(matrix)
    tiltEast(matrix)

    // console.log('transformed')
    // console.log(matrix.join('\r\n'))

    value =  matrix.reduce((accum, curr, index) => {
      const level = matrix.length - index
      const zeros = curr.filter((item) => item === 'O')
      return accum + level * zeros.length
    }, 0)

    // check pattern
    const repeatedLoad = loads.findIndex(load => load === value)
    if (repeatedLoad !== -1 && loads.length >= (matrix.length + 1)) {
      loads.forEach(load => console.log(load))
      break
    }

    loads.push(value)
  }

  // after a specific number of loads, there will be a pattern of 7 numbers.
  // so, instead of completing the 1B loop, just check the pattern
  const pattern = loads.slice(loads.length - 7, loads.length)
  return pattern[(1000000000 - loads.length - 7) % 7 - 1]

}

module.exports = {
  process,
}
