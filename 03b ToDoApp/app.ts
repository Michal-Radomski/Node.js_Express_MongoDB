const parseArgs = require("minimist");
// const colors = require("colors/safe");
// const fs = require("fs");

import handleCommand from "./handleCommand";

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

// console.log("command:", command);

handleCommand(command);
