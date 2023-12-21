/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  const matrix = []
  inputs.forEach((input) => matrix.push(input.split('')))

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

  console.log('transformed')
  console.log(matrix.join('\r\n'))

  return matrix.reduce((accum, curr, index) => {
    const level = matrix.length - index
    const zeros = curr.filter((item) => item === 'O')
    return accum + level * zeros.length
  }, 0)
}

module.exports = {
  process,
}
