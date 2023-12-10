const START = 'S'

const directions = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
}

const directionKeys = Object.keys(directions)

const validConnections = {
  [directions.UP]: ['|', 'F', '7', 'S'],
  [directions.DOWN]: ['|', 'J', 'L', 'S'],
  [directions.LEFT]: ['-', 'F', 'L', 'S'],
  [directions.RIGHT]: ['-', '7', 'J', 'S'],
}

const validDirections = {
  '|': ['UP', 'DOWN'],
  '-': ['LEFT', 'RIGHT'],
  F: ['RIGHT', 'DOWN'],
  L: ['RIGHT', 'UP'],
  7: ['LEFT', 'DOWN'],
  J: ['LEFT', 'UP'],
  S: ['UP', 'DOWN', 'LEFT', 'UP'],
}

const isValidDirection = (pipe, key) => {
  return validDirections[pipe]?.includes(key)
}

const getValidConnections = (inputs, i, j, previousI = -1, previousJ = -1) => {
  // console.log('evaluate', i, j)
  const pipe = inputs[i][j]
  const pipeStartConnections = []

  directionKeys.forEach((key) => {
    if (!isValidDirection(pipe, key)) {
      return
    }

    const direction = directions[key]
    const connectionI = i + direction[0]
    const connectionJ = j + direction[1]
    const connection = inputs[connectionI][connectionJ]
    const validConnectionsByDirection = validConnections[direction]

    if (
      validConnectionsByDirection.includes(connection) &&
      `${previousI}${previousJ}` !== `${connectionI}${connectionJ}`
    ) {
      pipeStartConnections.push([
        i + direction[0],
        j + direction[1],
        connection,
      ])
    }
  })

  return pipeStartConnections
}

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  let next,
    previous = undefined
  const path = new Set()

  // find the S
  rowLoop: for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
      if (inputs[i][j] === START) {
        path.add(`${i},${j},${START}`) // start of path

        next = getValidConnections(inputs, i, j)[0]
        path.add(`${next[0]},${next[1]},${next[2]}`) // next pipe

        previous = [i, j]

        break rowLoop
      }
    }
  }

  while (true) {
    const currentI = next[0]
    const currentJ = next[1]
    next = getValidConnections(
      inputs,
      currentI,
      currentJ,
      previous[0],
      previous[1]
    )[0]

    const coordinatesOfNext = `${next[0]},${next[1]},${next[2]}`
    if (path.has(coordinatesOfNext)) {
      break
    }

    previous = [currentI, currentJ]
    path.add(coordinatesOfNext)
  }
  // console.log(path)
  return Math.ceil(path.size / 2)
}

module.exports = {
  process,
}

/**
 *
-L|F7
7S-7|
L|7||
-L-J|
L|-JF


..F7.
.FJ|.
SJ.L7
|F--J
LJ...
 *
 */
