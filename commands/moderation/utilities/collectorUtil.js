const errorTimeoutMessage = 'The command timed out. Please try again.';

const config = { max: 1, time: 6500 };
const commandTimeoutMessage = `\nThis command will timeout after ${(config.time / 1000).toFixed(2)} ${
	config.time / 1000 === 1 ? 'second' : 'seconds'
}.`;
const filter = (response, message) => response.author.id === message.author.id;
module.exports = { errorTimeoutMessage, config, commandTimeoutMessage, filter };
