const process = (inputs) => {
  let result = 0
  
  for (let input of inputs) {
    const [_, cards] = input.split(':')
    const [winningCards, myCards]  = cards.split('|')

    const winningCardsNumbers = winningCards.trim().split(' ')
    const myCardsNumbers = myCards.trim().split(' ')

    const matches = myCardsNumbers.filter(number => {
      return number.length && winningCardsNumbers.includes(number)
    })

    // console.log(matches)

    if (matches.length) {
      result += matches.length > 1 ? Math.pow(2, matches.length - 1) : 1
    }
  }
  console.log(result)
};

module.exports = {
  process,
};
