const client = require('../db-client');
const logger = require("../utils/logger");

async function list(req, res) {
    const branches = await client.branch.findMany({});
    res.status(200).json(branches);
}

module.exports = {
    list
}