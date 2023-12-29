const memo = {}

const getNumberOfMatches = (card, input) => {
  let matches = memo[card]
  if (matches) return matches

  const [_, cards] = input.split(':')
  const [winningCards, myCards] = cards.split('|')

  const winningCardsNumbers = winningCards.trim().split(' ')
  const myCardsNumbers = myCards.trim().split(' ')

  matches = myCardsNumbers.filter(number => {
    return number.length && winningCardsNumbers.includes(number)
  })

  memo[card] = matches.length

  return matches.length
}


const process = (inputs) => {
  const result = {count: 0}

  // this really sucks because it took around 10 seconds to complete
  processInputsRecursive(inputs, result, 0, inputs.length )
  
  console.log(result.count)
};

const processInputsRecursive = (inputs, result, from, to) => {
  for (let i = from; i < to; i++) {
    result.count++;
    const matches = getNumberOfMatches(i + 1, inputs[i])
    if (matches) {
      // const winningCards = inputs.slice(from, to)
      // console.log(from, to, winningCards)

      processInputsRecursive(inputs, result, i + 1, i + 1 + matches)
    }

  }

}

module.exports = {
  process,
};
