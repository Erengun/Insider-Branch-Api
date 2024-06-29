const client = require('../db-client');
const logger = require("../utils/logger");

async function listBranches(req, res) {
    const branches = await client.branch.findMany({});
    res.status(200).json(branches);
}

async function addBranch(req, res) {
    const { name, full_address, latitude, longitude, phone } = req.body;
    const branch = await client.branch.create({
        data: {
            name,
            full_address,
            latitude,
            longitude,
            phone
        }
    });
    res.status(201).json(branch);
}

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
    addBranch,
    editBranchDetails,
    removeBranch
}