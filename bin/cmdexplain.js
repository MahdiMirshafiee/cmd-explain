#!/usr/bin/env node

const { explainCommand } = require("../src/main.js");

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
  console.log(`
CMD Explain - Terminal Command Helper

Usage:
cmdexplain <your-command>
cex <your-command>

Options:
--help, -h      show this help message
`);
  process.exit(0);
}

const userCommand = args.join(" ");

explainCommand(userCommand)
  .then((output) => {
    if (output === "0") {
      return console.log(
        "\n" +
          "Sorry, I didn't recognize that. Please enter a valid shell command." +
          "\n"
      );
    } else {
      console.log("\n" + output + "\n");
    }
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
