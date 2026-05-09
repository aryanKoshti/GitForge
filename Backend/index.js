const yargs = require('yargs');
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init")

yargs(hideBin(process.argv))
    .command("init", "Initialise a new repositary", {}, initRepo)
    .command("add <file>", "Add a file to the repositary", (yargs) => {
        yargs.positional("file", {
            describe: "File ot add to the staging area",
            type: "string"
        })
    }, initRepo)
    .command("commit", "Initialise a new repositary", {}, initRepo)

    .demandCommand(1, "You need at least one command")
    .help().argv;

