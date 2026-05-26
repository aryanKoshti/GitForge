const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

const createIssue = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;

    try {
        const issue = new Issue({
            title,
            description,
            repository: id,

        });

        await issue.save();
        res.status(201).json(issue);
    } catch (err) {
        console.error(
            "Error during issue creation: ",
            err.message
        );

        return res.status(500).json({
            error: "Server error"
        });
    }
};

const updateIssueById = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const issue = await issue.findById(id);

        if (!issue) {
            return res.status(404).json({ error: "Issue not found!!" })
        }
        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();

        res.json(issue);
    } catch (err) {
        console.error(
            "Error during issue updation:",
            err.message
        );

        return res.status(500).json({
            error: "Server error"
        });
    }
}

const deleteIssueById = async (req, res) => {
    const { id } = req.params;

    try {
        const issue = Issue.findByIdAndDelete(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue not found!!" })
        }

    } catch (err) {
        console.error(
            "Error during issue updation:",
            err.message
        );

        return res.status(500).json({
            error: "Server error"
        });
    }
}

const getAllIssues = async (req, res) => {
    res.send("All Issue fetched!")
}

const getIssueById = async (req, res) => {
    res.send("Issue Details Feched~!")
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
};