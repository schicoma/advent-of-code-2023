/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  const words = inputs[0].split(',')
  return words.reduce((accum, word) => {

    let value = 0
    for (let i = 0; i < word.length; i++) {
      value += word[i].charCodeAt(0)
      value *= 17
      value = value % 256
    }

    return accum += value
  }, 0)
}

module.exports = {
  process,
}
