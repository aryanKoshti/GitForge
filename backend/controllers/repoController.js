

const createRepository = (req, res) => {
    res.send("Repository created!")
}

const getAllRepository = (req, res) => {
    res.send("All repositories fetched!")
};

const fetchRepositoryById = (req, res) => {
    res.send("Repository Details Fetched!")
};

const fetchRepositoryByName = (req, res) => {
    res.send("Repository Details Fetched!")
};

const fetchRepositoriesForCurrntUser = (req, res) => {
    res.send("Repositories for logged in user Fetched!")
};

const updateRepositoryById = (req, res) => {
    res.send("Repository updated!")
}

const toggleVisibliltyById = (req, res) => {
    res.send("Repository toggled")
}

const deleteRepositoryById = (req, res) => {
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