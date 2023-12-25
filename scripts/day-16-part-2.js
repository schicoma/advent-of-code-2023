const formatCoordinates = (i, j) => i + ',' + j

const reflectBeamFromPoint = (inputs, energizedPoints, i, j, direction) => {
  if (!(0 <= i && i < inputs.length && 0 <= j && j < inputs.length)) {
    return
  }

  const coordinates = formatCoordinates(i, j)
  if (energizedPoints.has(coordinates)) {
    const directions = energizedPoints.get(coordinates)

    if (directions.includes(direction)) {
      return
    }

    energizedPoints.set(coordinates, [direction, ...directions])
  } else {
    energizedPoints.set(coordinates, [direction])
  }

  const char = inputs[i][j]

  let continueReflection = true
  let newI = direction === 'u' ? i - 1 : direction === 'd' ? i + 1 : i
  let newJ = direction === 'l' ? j - 1 : direction === 'r' ? j + 1 : j

  switch (char) {
    case '-':
      if (direction == 'u' || direction == 'd') {
        continueReflection = false

        reflectBeamFromPoint(inputs, energizedPoints, i, j - 1, 'l')
        reflectBeamFromPoint(inputs, energizedPoints, i, j + 1, 'r')
      }
      break

    case '|':
      if (direction == 'l' || direction == 'r') {
        continueReflection = false

        reflectBeamFromPoint(inputs, energizedPoints, i - 1, j, 'u')
        reflectBeamFromPoint(inputs, energizedPoints, i + 1, j, 'd')
      }
      break

    case '/':
      if (direction == 'l') {
        direction = 'd'
        newI++
        newJ = j
      } else if (direction == 'r') {
        direction = 'u'
        newI--
        newJ = j
      } else if (direction == 'u') {
        direction = 'r'
        newJ++
        newI = i
      } else if (direction == 'd') {
        direction = 'l'
        newJ--
        newI = i
      }
      break

    case '\\':
      if (direction == 'l') {
        direction = 'u'
        newI--
        newJ = j
      } else if (direction == 'r') {
        direction = 'd'
        newI++
        newJ = j
      } else if (direction == 'u') {
        direction = 'l'
        newJ--
        newI = i
      } else if (direction == 'd') {
        direction = 'r'
        newJ++
        newI = i
      }
      break
  }

  if (continueReflection) {
    reflectBeamFromPoint(inputs, energizedPoints, newI, newJ, direction)
  }
}

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  const energizedPoints = new Map()
  let max = 0

  for (let j = 0; j < inputs[0].length; j++) {
    let i = 0
    // top row
    reflectBeamFromPoint(inputs, energizedPoints, i, j, 'd')
    console.log(i, j, '=', energizedPoints.size)

    if (energizedPoints.size > max) {
      max = energizedPoints.size
    }
    energizedPoints.clear()

    // bottom row
    i = inputs.length - 1
    reflectBeamFromPoint(inputs, energizedPoints, i, j, 'u')
    console.log(i, j, '=', energizedPoints.size)

    if (energizedPoints.size > max) {
      max = energizedPoints.size
    }
    energizedPoints.clear()
  }

  for (let i = 1; i < inputs.length - 1; i++) {
    let j = 0
    // left colum
    reflectBeamFromPoint(inputs, energizedPoints, i, j, 'r')
    console.log(i, j, '=', energizedPoints.size)

    if (energizedPoints.size > max) {
      max = energizedPoints.size
    }
    energizedPoints.clear()

    // right column
    j = inputs[0].length - 1
    reflectBeamFromPoint(inputs, energizedPoints, i, j, 'l')
    console.log(i, j, '=', energizedPoints.size)

    if (energizedPoints.size > max) {
      max = energizedPoints.size
    }
    energizedPoints.clear()
  }

  return max
}

module.exports = {
  process,
}
