const times = 1000000
// const times = 1000
// const times = 10
// const times = 2

/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  let galaxies = []
  let emptyRows = []
  let emptyColumns = []

  for (let row = 0; row < inputs.length; row++) {
    const galaxiesInRowMatches = inputs[row].matchAll(/[#]/g)
    const galaxiesInRow = Array.from(galaxiesInRowMatches)

    // evaluation row
    if (!galaxiesInRow.length) {
      emptyRows.push(row)
    }

    for (let galaxy of galaxiesInRow) {
      galaxies.push([row, galaxy.index])
    }

    // evaluating column
    let areGalaxiesInColumn = false
    for (let pointer = 0; pointer < inputs.length; pointer++) {
      // second conditions is to avoid duplicates
      if (inputs[pointer][row] === '#') {
        areGalaxiesInColumn = true
      }
    }

    if (!areGalaxiesInColumn) {
      emptyColumns.push(row)
    }
  }

  let totalPath = 0

  for (let i = 0; i < galaxies.length; i++) {
    const from = galaxies[i]
    for (let j = i + 1; j < galaxies.length; j++) {
      const to = galaxies[j]
      let jumpsRow = 0
      let jumpsCols = 0

      for (let index of emptyRows) {
        if (
          Math.min(from[0], to[0]) < index &&
          index < Math.max(from[0], to[0])
        ) {
          jumpsRow++
        }
      }

      for (let index of emptyColumns) {
        if (
          Math.min(from[1], to[1]) < index &&
          index < Math.max(from[1], to[1])
        ) {
          jumpsCols++
        }
      }

      const path = Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1])

      totalPath += path + (jumpsRow + jumpsCols) * (times -1)
    }
  }

  return totalPath // i dont know why, i will have to review this exercise later
}

module.exports = {
  process,
}

/**

...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....

 */
