#!/usr/bin/env node

const { explainCommand } = require("../src/main.js");

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
  console.log(`
CMD Explain - Terninal Command Helper

Usage:
cmdexplain <your-terminal-command>
cex <your-terminal-command>

Options:
--help, -h      show this help message
`);
  process.exit(0);
}

const userCommand = args.join(" ");

explainCommand(userCommand)
  .then((output) => {
    if (output === "0") {
      return console.log("The input is wrong");
    } else {
      console.log("\n Explanation:");
      console.log(output);
    }
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
