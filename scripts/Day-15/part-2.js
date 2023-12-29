/**
 *
 * @param {string[]} inputs
 */
const process = (inputs) => {
  const words = inputs[0].split(',')

  const box = {}

  words.forEach((word) => {
    let separator = '-'
    const hyphenIndex = word.indexOf(separator)
    const hasHyphen = hyphenIndex !== -1

    if (!hasHyphen) {
      separator = '='
    }

    const [key, number] = word.split(separator)

    let value = 0
    for (let i = 0; i < key.length; i++) {
      value += key[i].charCodeAt(0)
      value *= 17
      value = value % 256
    }

    if (!box[value]) {
      box[value] = []
    }

    let index = undefined

    const slots = box[value]
    for (let i = 0; i < slots.length; i++) {
      if (slots[i][0] === key) {
        index = i
        break
      }
    }

    if (hasHyphen) {
      if (index !== undefined) {
        slots.splice(index, 1)
      }
    } else {
      if (index !== undefined) {
        slots[index] = [key, number]
      } else {
        slots.push([key, number])
      }
    }
  })

  const keys = Object.keys(box)
  return keys.reduce((accum, key) => {
    let boxValue = 0
    const slots = box[key]

    slots.forEach((slot, index) => {
      boxValue += ((+key + 1) * (index + 1) * +slot[1])
    })
    

    return accum += boxValue
  }, 0)
}

module.exports = {
  process,
}
