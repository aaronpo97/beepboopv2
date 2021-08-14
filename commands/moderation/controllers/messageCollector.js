const errorTimeoutMessage = 'The command timed out. Please try again.';

const messageCollectionConfig = { max: 1, time: 15000 };
const commandTimeoutMessage = `\nThis command will timeout after ${(messageCollectionConfig.time / 1000).toFixed(2)} ${
	messageCollectionConfig.time / 1000 === 1 ? 'second' : 'seconds'
}.`;

module.exports = { errorTimeoutMessage, messageCollectionConfig, commandTimeoutMessage };
