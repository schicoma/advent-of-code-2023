const process = (inputs) => {
  const times = inputs[0].split(':')[1].match(/\d+/g)
  const distances = inputs[1].split(':')[1].match(/\d+/g)

  let result = 1

  for (let i = 0; i < times.length; i++) {
    let counter = 0
    for (let time = 1; time <= +times[i]; time++) {
      const milimeters = (times[i] - time) * time

      if (i === 1) console.log(distances[i],  '<=', milimeters, distances[i] <= milimeters, time)
      if (distances[i] < milimeters)
        counter++


      if (counter > 0 && distances[i] >= milimeters) break;
    }
    // console.log(counter, times[i], distances[i])
    result *= (counter || 1)
  }

  console.log(result)
};

module.exports = {
  process,
};
