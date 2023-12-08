const maxAmount = {
  red: 12,
  green: 13,
  blue: 14,
};

const process = (inputs) => {
  const result = inputs.reduce((accum, curr, index) => {
    const [game, detail] = curr.split(":");
    const sets = detail.split(";");

    const cubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const set of sets) {
      const colorMatches = set.split(",");
      for (let colorMatch of colorMatches) {
        colorMatch = colorMatch.trim().split(" ");
        const total = +colorMatch[0];
        const color = colorMatch[1].trim();

        if (total > cubes[color]) {
          cubes[color] = total;
        }
      }
    }

    const power = cubes.red * cubes.blue * cubes.green
    console.log(game, power)
    return accum + power;
  }, 0);

  console.log(result);
};

module.exports = {
  process,
};
