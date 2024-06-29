const logger = {
	server: (message) => console.log(`SERVER: ${message}`),
	info: (message) => console.log(`INFO: ${message}`),
	error: (message) => console.error(`ERROR: ${message}`),
	debug: (message) => console.debug(`DEBUG: ${message}`),
}


module.exports = logger