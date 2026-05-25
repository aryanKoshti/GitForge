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
                repoName: name,
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
        console.error("Error during fetching repositories!!", err.message);
        res.status(500).send("Server error");
    }
};

const fetchRepositoryById = async (req, res) => {
    const repoId = req.params.id;

    try {

        if (
            !mongoose.Types.ObjectId.isValid(repoId)
        ) {
            return res.status(400).json({
                error: "Invalid Repository ID"
            });
        }

        const repository = await Repository.find({ _id: repoId })
            .populate("owner")
            .populate("issues");

        if (!repository) {
            return res.status(404).json({
                error: "Repository not found"
            });
        }

        return res.status(200).json(repository);

    } catch (err) {
        console.error("Error during fetching repository!!", err.message);
        res.status(500).send("Server error");
    }
};

const fetchRepositoryByName = async (req, res) => {
    const repoName = req.params.name;

    try {
        const repository =
            await Repository.findOne({
                repoName: repoName
            })
                .populate("owner")
                .populate("issues");

        if (!repository) {
            return res.status(404).json({
                error: "Repository not found"
            });
        }

        return res.status(200).json(repository);

    } catch (err) {
        console.error(
            "Error during fetching repository:",
            err.message
        );

        return res.status(500).json({
            error: "Server error"
        });
    }
};

const fetchRepositoriesForCurrntUser = async (req, res) => {
    const userId = req.user;

    try {
        const repositories = await Repository.find({ owner: userId });

        if (!repositories || repositories.length == 0) {
            return res.status(404).json({ error: "Repository not found" })
        }

        res.json({ message: "Repositories fetched!", repositories })

    } catch (err) {
        console.error(
            "Error during fetching repository:",
            err.message
        );
        return res.status(500).json({
            error: "Server error"
        });
    }
};

const updateRepositoryById = async (req, res) => {

    const id = req.params.id;
    const { content, description } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid Repository ID"
            });
        }
        const repository =
            await Repository.findById(id);

        if (!repository) {
            return res.status(404).json({
                error: "Repository not found"
            });
        }
        if (content !== undefined) {
            repository.content = content;
        }
        if (description !== undefined) {
            repository.description = description;
        }
        await repository.save();
        return res.status(200).json({
            message: "Repository updated successfully",
            repository
        });
    } catch (err) {
        console.error(
            "Error updating repository:",
            err.message
        );
        return res.status(500).json({
            error: "Server error"
        });
    }
};

const toggleVisibilityById = async (req, res) => {
    const id = req.params.id;
    try {
        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
            return res.status(400).json({
                error: "Invalid Repository ID"
            });
        }
        const repository =
            await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({
                error: "Repository not found"
            });
        }
        repository.visibility = !repository.visibility;

        await repository.save();

        return res.status(200).json({
            message:
                "Repository visibility toggled successfully",
            visibility:
                repository.visibility
        });

    } catch (err) {
        console.error(
            "Error toggling visibility:",
            err.message
        );
        return res.status(500).json({
            error: "Server error"
        });
    }
};

const deleteRepositoryById = async (req, res) => {
    const id = req.params.id;
    try {
        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
            return res.status(400).json({
                error: "Invalid Repository ID"
            });
        }
        const deletedRepository =
            await Repository.findByIdAndDelete(id);
        if (!deletedRepository) {
            return res.status(404).json({
                error: "Repository not found"
            });
        }
        return res.status(200).json({
            message:
                "Repository deleted successfully"
        });

    } catch (err) {
        console.error(
            "Error deleting repository:",
            err.message
        );
        return res.status(500).json({
            error: "Server error"
        });
    }
};

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