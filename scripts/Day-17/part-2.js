/**
 * It took 3 minutes for the algorithym to complete the task.
 * Update -> now, it takes 45 seconds :)
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
      const isSameDirection =
        horizontalMovement === next[DIRECTION_ROW] &&
        verticalMovement === next[DIRECTION_COLUMN]

      let minMovements = !isSameDirection ? 4 : 1
      let newRow = next[ROW] + horizontalMovement * minMovements
      let newColumn = next[COLUMN] + verticalMovement * minMovements

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

      let numberOfTimes = minMovements
      let heatLoss = undefined

      if (isSameDirection) {
        if (next[COUNT_SAME_DIRECTION] === 10) {
          continue
        }

        numberOfTimes = next[COUNT_SAME_DIRECTION] + minMovements
        heatLoss = next[HEAT_LOSS] + parseInt(inputs[newRow][newColumn])
      } else {
        heatLoss = [0,1,2,3].reduce((accum, curr) => {
          const i = horizontalMovement === 0 ? newRow : newRow + (-horizontalMovement * curr)
          const j = verticalMovement === 0 ? newColumn : newColumn + (-verticalMovement * curr)
          return accum += parseInt(inputs[i][j])
        }, next[HEAT_LOSS])  
      }

      // TODO
      const newItem = [
        heatLoss,
        newRow,
        newColumn,
        horizontalMovement,
        verticalMovement,
        numberOfTimes,
      ]

      // priorityQueue.unshift(newItem)
      const index = getIndexToPushPriorityQueue(priorityQueue, newItem)
      priorityQueue.splice(index, 0, newItem)
    }

    // priorityQueue.sort((a, b) => b[HEAT_LOSS] - a[HEAT_LOSS])
  }

  return minHeatLoss
}

function getIndexToPushPriorityQueue(priorityQueue, newItem) {
  const heatLoss = newItem[HEAT_LOSS]

  if (!priorityQueue.length) {
    return 0
  }

  if (priorityQueue.length === 1) {
    return heatLoss < priorityQueue[0][HEAT_LOSS] ? 1: 0
  }

  const middle = Math.ceil(priorityQueue.length / 2)
  if (heatLoss < priorityQueue[middle][HEAT_LOSS]) {
    return getIndexToPushPriorityQueue(priorityQueue.slice(middle, priorityQueue.length), newItem) + middle
  } else {
    return getIndexToPushPriorityQueue(priorityQueue.slice(0, middle - 1), newItem)
  }
}

module.exports = {
  process,
}

/**
 * priority queue
 * 
111111111111
999999999991
999999999991
999999999991
999999999991
 * 
 * 
 */
