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
  J: 0,
  T: 10
}

const getMaxCard = (countOfCards) => {
  const entries = Object.entries(countOfCards).filter((card) => card[0] !== 'J');
  entries.sort((a, b) => {
    const comparator = b[1] - a[1] // desc by count
    if (comparator !== 0) {
      return comparator
    }
    return getNumber(b[0]) - getNumber(a[0]) // desc by card value
  })

  return entries.length ? entries[0][0]: 'A'
}

/**
 * 
 * @param {string} hand 
 * @returns 
 */
const getTypeByHand = (hand) => {
  const cards = hand.split('');
  let countOfCards = cards.reduce((acum, curr) => {
    if (!acum[curr]) acum[curr] = 0
    acum[curr] = acum[curr] + 1
    return acum
  }, {})

  let keys = Object.keys(countOfCards)
  const jokers = countOfCards['J'] ?? 0

  let newHand = hand
  if (jokers) {
    const maxCard = getMaxCard(countOfCards)
    delete countOfCards['J']
    countOfCards[maxCard] = countOfCards[maxCard] + jokers
    keys = Object.keys(countOfCards)

    newHand  = hand.replaceAll('J', maxCard)
  }

  let level = handsByLevel.HIGH_CARD
  if (keys.length === 1) {
    level = handsByLevel.FIVE_OF_A_KIND
  } else if (keys.length === 2) {

    const values = Object.values(countOfCards)
    if (values.includes(4)) {
      level = handsByLevel.FOUR_OF_A_KIND
    } else {
      level = handsByLevel.FULL_HOUSE
    }

  } else if (keys.length === 3) {

    const values = Object.values(countOfCards)
    if (values.includes(3)) {
      level = handsByLevel.THREE_OF_A_KIND
    } else {
      level = handsByLevel.TWO_PAIRS
    }
  } else if (keys.length === 4) {
    level = handsByLevel.ONE_PAIR
  }

  return [level, cards, newHand]
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
    return [hand, +bid, ...getTypeByHand(hand) ]
  });

  orderedCards.sort((a, b) => {
    const comparator = a[2] - b[2] // asc

    if (comparator !== 0) {
      return comparator
    }

    for (let i = 0; i < a[3].length; i++) {
      const subComparator = getNumber(a[3][i]) - getNumber(b[3][i]) // asc
      if (subComparator !== 0) {
        return subComparator
      }
    }
    return 0
  })

  const result = orderedCards.reduce((accum, curr, index) => {
    console.log(curr, index + 1)
    return accum += curr[1] * (index + 1)
  }, 0)

  console.timeEnd()
  return result
};

module.exports = {
  process,
};
