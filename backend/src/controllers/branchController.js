const client = require('../db-client');

/**
 * Retrieves a list of all branches.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the list of branches.
 */
async function listBranches(req, res) {
    const branches = await client.branch.findMany({});
    res.status(200).json(branches);
}

/**
 * Edits the details of a branch.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the updated branch details.
 */
async function editBranchDetails(req, res) {
    const { id } = req.params;
    const { name, full_address, latitude, longitude, phone } = req.body;
    const branch = await client.branch.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            full_address,
            latitude,
            longitude,
            phone
        }
    });
    res.status(200).json(branch);
}

/**
 * Removes a branch.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the deleted branch.
 */
async function removeBranch(req, res) {
    const { id } = req.params;
    const branch = await client.branch.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.status(200).json(branch);
}

module.exports = {
    listBranches,
    editBranchDetails,
    removeBranch
}