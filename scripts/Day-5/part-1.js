/**
 *
 * @param {string[]} inputs
 * @returns
 */
const process = (inputs) => {
  // building almanac
  const almanac = {}
  const almanacPath = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location',
  ]

  const seeds = inputs[0].match(/\d+/g)
  let currentKey = undefined

  for (let i = 2; i < inputs.length; i++) {
    const row = inputs[i]
    if (row.trim() === '') {
      continue
    }

    if (row.includes('map')) {
      currentKey = row.split(' ')[0]
      continue
    }

    if (!almanac[currentKey]) almanac[currentKey] = []
    almanac[currentKey].push(row.match(/\d+/g))
  }

  // calculating location
  let lowest = Infinity

  seeds.forEach((seed) => {
    let location = +seed
    
    almanacPath.forEach((path) => {
      for (let detail of almanac[path]) {
        const destination = +detail[0]
        const source = +detail[1]
        const length = +detail[2]
        if (source <= location && location < source + length) {
          const index = location - source
          location = destination + index
          break
        }
      }
  
      // console.log(location, path)
    })

    if (location < lowest) {
      lowest = location
    }
  })

  return lowest
}

module.exports = {
  process,
}

/**
 * 
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
 * 
 */
