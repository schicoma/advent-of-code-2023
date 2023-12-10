const { program } = require('commander')
const fs = require('fs')
const readline = require('readline')

function getInput() {
  program
    .option('-t, --test', 'test mode')
    .option('-d, --day <value>', 'advent code day (default 1)')
    .option('-p, --part <value>', 'part (default 1)')

  program.parse()
  const options = program.opts()
  // console.log(options)

  const day = options.day ?? 1
  const part = options.part ?? 1
  const name = options.test ? 'test.txt' : `input-day-${day}.txt`
  const fileStream = fs.createReadStream('./input/' + name)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const inputs = []

  rl.on('line', (line) => {
    inputs.push(line)
  })

  rl.on('close', () => {
    const {
      process: execProcess,
    } = require(`./scripts/day-${day}-part-${part}`)
    
    console.time()

    const result = execProcess(inputs)
    if (result) console.log(result)

    console.timeEnd()
  })

  rl.on('error', (error) => {
    console.error(error)
  })
}

getInput()
