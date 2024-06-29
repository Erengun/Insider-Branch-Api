const logger = {
	info: (message) => console.log(`INFO: ${message}`),
	error: (message) => console.log(`ERROR: ${message}`),
	debug: (message) => console.log(`DEBUG: ${message}`),
}


module.exports = logger