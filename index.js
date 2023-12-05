const fs = require("fs");
const readline = require("readline");

const {nameOfFile, process} = require('./scripts/day-3-part-2')

function getInput(name) {
  const fileStream = fs.createReadStream("./input/" + name);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const inputs = [];

  rl.on("line", (line) => {
    inputs.push(line);
  });

  rl.on("close", () => {
    process(inputs);
  });

  rl.on("error", (error) => {
    console.error(error);
  });
}

getInput(nameOfFile);