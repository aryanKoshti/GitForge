const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");


const createRepository = async (req, res) => {
    const {
        owner,
        name,
        description,
        visibility
    } = req.body;

    try {
        if (!name) {
            return res.status(400).json({
                error: "Repository name is required!"
            });
        }
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({
                error: "Invalid User ID!"
            });
        }
        const existingUser =
            await User.findById(owner);

        if (!existingUser) {
            return res.status(404).json({
                error: "Owner not found!"
            });
        }
        const newRepository =
            new Repository({
                repoName:name,
                description,
                visibility,
                owner,
                issues: [],
                content: []
            });

        await newRepository.save();

        return res.status(201).json({
            message:
                "Repository created successfully",
            repository: newRepository
        });
    } catch (err) {
        console.error(
            "Error during repository creation:",
            err.message
        );

        return res.status(500).json({
            error: "Server error"
        });
    }
};

const getAllRepository = async (req, res) => {
    try {
        
        const repositories = await Repository.find({})
        .populate("owner")
        .populate("issues");

        res.json(repositories);

    } catch (err) {
          console.error("Error during fetching repositories!!");
          res.status(500).send("Server error");
    }
};

const fetchRepositoryById = async (req, res) => {
    res.send("Repository Details Fetched!")
};

const fetchRepositoryByName = async (req, res) => {
    res.send("Repository Details Fetched!")
};

const fetchRepositoriesForCurrntUser = async (req, res) => {
    res.send("Repositories for logged in user Fetched!")
};

const updateRepositoryById = async (req, res) => {
    res.send("Repository updated!")
}

const toggleVisibliltyById = async (req, res) => {
    res.send("Repository toggled")
}

const deleteRepositoryById = async (req, res) => {
    res.send("Repository deleted!")
}

module.exports = {
    createRepository,
    getAllRepository,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrntUser,
    updateRepositoryById,
    toggleVisibliltyById,
    deleteRepositoryById
}