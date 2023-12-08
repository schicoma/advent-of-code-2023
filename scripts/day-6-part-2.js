const process = (inputs) => {
  console.time()
  const maxTime = inputs[0].split(':')[1].match(/\d+/g).join('')
  const maxDistance = inputs[1].split(':')[1].match(/\d+/g).join('')

  let result = 1

  let counter = 0
  for (let time = 1; time <= +maxTime; time++) {
    const milimeters = (maxTime - time) * time

    if (maxDistance < milimeters) counter++

    if (counter > 0 && maxDistance >= milimeters) break;
  }

  result *= (counter || 1)
  console.timeEnd()

  console.log(result)
};

module.exports = {
  process,
};
