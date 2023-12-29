const getFormattedCoordinates = (i, j) => {
  return `${i},${j}`
}

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  const coordinates = {}
  let area = 0

  let i = 0
  let j = 0

  let maxI = 0
  let maxJ = 0

  // building connections
  for (let index = 0; index < inputs.length; index++) {
    const [direction, steps, color] = inputs[index]
      .split(' ')
      .map((value, index) => {
        if (index === 1) {
          return Number(value)
        }

        return value
      })
    for (let step = 1; step <= steps; step++) {
      if (direction === 'U') {
        i--
      } else if (direction === 'D') {
        i++
      } else if (direction === 'R') {
        j++
      } else if (direction === 'L') {
        j--
      }

      if (maxI > i) {
        maxI = i
      }

      if (maxJ > j) {
        maxJ = j
      }

      // get direction of the corner
      if (step - 1 === steps) {
        // get next element
        const nextDirection = inputs[0].substring(0, 1)

        if (nextDirection === 'U' || nextDirection === 'D') {
          direction = nextDirection
        }
      }

      coordinates[getFormattedCoordinates(i, j)] = direction
    }
  }

  let isInArea = false
  let currentDirection = undefined

  // counting the area
  for (let i = 0; i <= maxI; i++) {
    for (let j = 0; j <= maxJ; j++) {
      const coordinate = getFormattedCoordinates(i, j)
      const direction = coordinates[coordinate]

      if (direction === 'U' || direction === 'D') {
        if (!currentDirection) {
          currentDirection = direction
          isInArea = true
        }

        if (currentDirection !== direction) {
          currentDirection = undefined
          isInArea = false
        }
      }

      if (isInArea ) {
        area++
      }
    }

    currentDirection = undefined
  }

  console.log(coordinates)

  return area
}

module.exports = {
  process,
}

/**

R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
 */
