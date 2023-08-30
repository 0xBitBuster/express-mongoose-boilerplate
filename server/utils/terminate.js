function terminate(server, options = { coredump: false, timeout: 500 }) {
	const exit = (code) => {
		options.coredump ? process.abort() : process.exit(code);
	};

	return (code, reason) => (err, promise) => {
		if (err && err instanceof Error) {
			console.log(err.message, err.stack);
		}

		// Attempt a graceful shutdown
		if (server) server.close(exit);
		setTimeout(exit, options.timeout).unref();
	};
}

module.exports = terminate;
