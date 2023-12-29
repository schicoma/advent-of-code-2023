/**
 * Thanks to @HyperNeutrino https://www.youtube.com/watch?v=2pDSooPLLkI&t=548s
 * I could understand gow Priority queues work, so I implemented my version of his solution
 * And when I said "my version", it is because his version is written in Python. 
 * 
 */

const HEAT_LOSS = 0
const ROW = 1
const COLUMN = 2
const DIRECTION_ROW = 3
const DIRECTION_COLUMN = 4
const COUNT_SAME_DIRECTION = 5

const getCoordinates = ([_heat, ...items]) => {
  return items.join(',')
}

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  const priorityQueue = [[0, 0, 0, 0, 0, 0]]
  const visited = {}

  let minHeatLoss = undefined

  while (!minHeatLoss) {
    next = priorityQueue.pop()

    const hasReachedGoal =
      next[ROW] === inputs.length - 1 && next[COLUMN] === inputs[0].length - 1
    if (hasReachedGoal) {
      minHeatLoss = next[HEAT_LOSS]
      break
    }

    // if we are going to an already visited direction, continue with the queue
    let coordinatesOfNewItem = getCoordinates(next)
    if (visited[coordinatesOfNewItem]) {
      continue
    }

    visited[coordinatesOfNewItem] = true

    // console.log(next)

    // visiting up, down , left, and right
    for (let [horizontalMovement, verticalMovement] of directions) {
      const newRow = next[ROW] + horizontalMovement
      const newColumn = next[COLUMN] + verticalMovement

      const isOutOfBound = !(
        0 <= newRow &&
        newRow < inputs.length &&
        0 <= newColumn &&
        newColumn < inputs[0].length
      )

      const isReverseDirection =
        horizontalMovement === -next[DIRECTION_ROW] &&
        verticalMovement === -next[DIRECTION_COLUMN]

      if (isOutOfBound || isReverseDirection) {
        continue
      }

      let numberOfTimes = 1
      const isSameDirection =
        horizontalMovement === next[DIRECTION_ROW] &&
        verticalMovement === next[DIRECTION_COLUMN]

      if (isSameDirection) {
        numberOfTimes = next[COUNT_SAME_DIRECTION] + 1

        if (numberOfTimes > 3) {
          continue
        }
      }

      const heatLoss = next[HEAT_LOSS] + parseInt(inputs[newRow][newColumn])
      const newItem = [
        heatLoss,
        newRow,
        newColumn,
        horizontalMovement,
        verticalMovement,
        numberOfTimes,
      ]

      priorityQueue.unshift(newItem)
    }

    priorityQueue.sort((a, b) => b[HEAT_LOSS] - a[HEAT_LOSS])
  }

  return minHeatLoss
}

module.exports = {
  process,
}

/**
 * priority queue
 * 
  const items = [
    [5, 'o'],   // [ [ 5, 'o' ] ]
    [10, 'i'],  // [ [ 5, 'o' ], [ 10, 'i' ] ]
    [3, 'u'],   // [ [ 3, 'u' ], [ 5, 'o' ], [ 10, 'i' ] ]
    [2, 'e'],   // [ [ 2, 'e' ], [ 3, 'u' ], [ 5, 'o' ], [ 10, 'i' ] ]
    [11, 'a'],  // [ [ 2, 'e' ], [ 3, 'u' ], [ 5, 'o' ], [ 10, 'i' ], [ 11, 'a' ] ]
  ]

  const priorityQueue = []
  for (let item of items) {
    priorityQueue.unshift(item)
    priorityQueue.sort((a, b) => a[0] - b[0])
  }
 * 
 * 
 */
