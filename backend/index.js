const express = require('express');
require("dotenv").config();
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require('http');

const yargs = require('yargs');
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add")
const { commitRepo } = require("./controllers/commit")
const { pushRepo } = require("./controllers/push")
const { pullRepo } = require("./controllers/pull")
const { revertRepo } = require("./controllers/revert")

yargs(hideBin(process.argv))
    .command("start", "Starts a new server", {}, startServer)

    .command("init", "Initialise a new repositary", {}, initRepo)

    .command("add <file>", "Add a file to the repositary", (yargs) => {
        yargs.positional("file", {
            describe: "File add to the staging area",
            type: "string"
        })
    }, (argv) => {
        addRepo(argv.file)
    })

    .command("commit <message>", "Commit the staged files",
        (yargs) => {
            yargs.positional("message", {
                describe: "Commit message",
                type: "string"
            });
        }, (argv) => {
            commitRepo(argv.message);
        })

    .command("push", "Push commits to S3", {}, pushRepo)

    .command("pull", "pull commits from S3", {}, pullRepo)

    .command(
        "revert <commitID>",
        "Revert to a specific commit",
        (yargs) => {
            yargs.positional("commitID", {
                describe: "commit ID to revert to",
                type: "string"
            });
        },
        (argv) => {
            revertRepo(argv.commitID);
        }
    )
    .demandCommand(1, "You need at least one command")
    .help().argv;

function startServer() {
    const app = express();
    const port = process.env.PORT || 8080;

    app.use(bodyParser.json());
    app.use(express.json());


    // MongoDB connection
    const mongoURI = process.env.MONGO_URI;

    const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected!!");

    } catch (err) {
        console.error("Unable to connect DB:", err);
    }
};

connectDB();

}