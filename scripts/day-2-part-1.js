// const nameOfFile = "test.txt";
const nameOfFile = "input-day-2.txt";

const maxAmount = {
  red: 12,
  green: 13,
  blue: 14,
};

const process = (inputs) => {
  const result = inputs.reduce((accum, curr, index) => {
    const [game, detail] = curr.split(":");
    const sets = detail.split(";");

    // const cubes = {
    //   red: 0,
    //   green: 0,
    //   blue: 0,
    // };

    let validGame = true;


    setLoop: for (const set of sets) {
      const colorMatches = set.split(",");
      for (let colorMatch of colorMatches) {
        colorMatch = colorMatch.trim().split(' ')
        const total = +colorMatch[0];
        const color = colorMatch[1].trim();

        // cubes[color] += total;

        if (total > maxAmount[color]) {
          validGame = false;
          break setLoop;
        }
      }
    }
    console.log(game, (index +1), validGame)
    return validGame ? accum + (index + 1) : accum;
  }, 0);

  console.log(result)

};

module.exports = {
  process,
  nameOfFile,
};
