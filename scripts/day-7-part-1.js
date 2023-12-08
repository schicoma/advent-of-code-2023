const nameOfFile = "input-day-7.txt";
// const nameOfFile = "test.txt";

const handsByLevel = {
  FIVE_OF_A_KIND: 7,//5
  FOUR_OF_A_KIND: 6, //4,1
  FULL_HOUSE: 5, //3,2
  THREE_OF_A_KIND: 4, //3,1,1
  TWO_PAIRS: 3,  // 2,2,1
  ONE_PAIR: 2,  // 2,1,1,1 
  HIGH_CARD: 1, // 1,1,1,1,1
}

const cardsEquivalence = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10
}

const getTypeByHand = (hand) => {
  const cards = hand.split('');
  const countOfCards = cards.reduce((acum, curr) => {
    if (!acum[curr]) acum[curr] = 0
    acum[curr]++
    return acum
  }, {})

  const keys = Object.keys(countOfCards)
  const values = Object.values(countOfCards)

  if (keys.length === 1) {
    return [handsByLevel.FIVE_OF_A_KIND, cards]
  } else if (keys.length === 2) {

    if (values.includes(4)) {
      return [handsByLevel.FOUR_OF_A_KIND, cards]
    } else {
      return [handsByLevel.FULL_HOUSE, cards]
    }

  } else if (keys.length === 3) {

    if (values.includes(3)) {
      return [handsByLevel.THREE_OF_A_KIND, cards]
    } else {
      return [handsByLevel.TWO_PAIRS, cards]
    }
  } else if (keys.length === 4) {
    return [handsByLevel.ONE_PAIR, cards]
  }

  return [handsByLevel.HIGH_CARD, cards]
}

const getNumber = (char) => {
  return Number(cardsEquivalence[char] ?? char)
}

/**
 * 
 * @param {string[]} inputs 
 */
const process = (inputs) => {
  console.time()

  const orderedCards = inputs.map((input) => {
    const [hand, bid] = input.split(' ')
    return [hand, ...getTypeByHand(hand), +bid]
  });

  orderedCards.sort((a, b) => {
    const comparator = a[1] - b[1] // asc

    if (comparator !== 0) {
      return comparator
    }

    for (let i = 0; i < a[2].length; i++) {
      const subComparator = getNumber(a[2][i]) - getNumber(b[2][i]) // asc
      if (subComparator !== 0) {
        return subComparator
      }
    }
    return 0
  })

  const result = orderedCards.reduce((accum, curr, index) => {
    return accum += curr[3] * (index + 1)
  }, 0) 

  console.log(orderedCards)
  console.log(result)
  console.timeEnd()
};

module.exports = {
  process,
  nameOfFile,
};
