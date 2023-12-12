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

const getDirectionOfPath = (connection, key) => {
  if (connection === 'F' && key === 'LEFT') {
    return 'DOWN'
  } else if (connection === 'L' && key === 'LEFT') {
    return 'UP'
  } else if (connection === 'J' && key === 'RIGHT') {
    return 'UP'
  } else if (connection === '7' && key === 'RIGHT') {
    return 'DOWN'
  }

  return key
}

const getFormattedCoordinates = (i, j)  =>{
  return `${i},${j}`
}

const getValidConnections = (inputs, i, j, previousI = -1, previousJ = -1) => {
  const pipe = inputs[i][j]
  const pipeStartConnections = []

  directionKeys.forEach((key) => {
    if (!isValidDirection(pipe, key)) {
      return
    }

    const direction = directions[key]
    const connectionI = i + direction[0]
    const connectionJ = j + direction[1]

    if (connectionI < 0 || connectionI === inputs.length) {
      return
    }

    if (connectionJ < 0 || connectionJ === inputs[i].length) {
      return
    }

    const connection = inputs[connectionI][connectionJ]
    const validConnectionsByDirection = validConnections[direction]

    // getting next item by direction (up, down, left, right)
    if (
      validConnectionsByDirection.includes(connection) &&
      getFormattedCoordinates(previousI, previousJ) !== getFormattedCoordinates(connectionI, connectionJ)
    ) {
      pipeStartConnections.push([
        i + direction[0],
        j + direction[1],
        getDirectionOfPath(connection, key),
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
  const path = new Map()

  console.log('find the S')
  rowLoop: for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
      if (inputs[i][j] === START) {
        next = getValidConnections(inputs, i, j)[0]

        if (next[1] === j) {
          path.set(getFormattedCoordinates(i, j), i - next[0] < 0 ? 'DOWN' : 'UP') // start of path
        }

        path.set(getFormattedCoordinates(next[0], next[1]), next[2]) // next pipe

        previous = [i, j]

        break rowLoop
      }
    }
  }

  console.log('building the connections')
  // key => row, column
  // value => direction of path
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

    const coordinatesOfNext = `${next[0]},${next[1]}`
    if (path.has(coordinatesOfNext)) {
      break
    }

    previous = [currentI, currentJ]
    path.set(coordinatesOfNext, next[2])
  }

  // calculate inbound characters
  let count = 0
  let isOpen = false
  let currentDirection = undefined

  for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
      const direction = path.get(getFormattedCoordinates(i, j))

      // get enclosed characters by row
      // UP .. included ... DOWN --- excluded --- UP .. included ... DOWN
      if (
        (direction === 'UP' || direction === 'DOWN') &&
        inputs[i][j] !== '-'
      ) {
        if (!currentDirection) {
          currentDirection = direction
          isOpen = true
        }

        if (currentDirection !== direction) {
          currentDirection = direction
          isOpen = !isOpen
        }
      }

      if (isOpen && !direction) count++
    }

    currentDirection = undefined
  }

  return count
}

module.exports = {
  process,
}

/**
 *
..........
.F-S----7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........
 *
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJIF7FJ-
L---JF-JLJIIIIFJLJJ7
|F|F-JF---7IIIL7L|7|
|FFJF7L7F-JF7IIL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
 */
