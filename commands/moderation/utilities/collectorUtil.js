const errorTimeoutMessage = 'The command timed out. Please try again.';

const messageCollectionConfig = { max: 1, time: 6500 };
const commandTimeoutMessage = `\nThis command will timeout after ${(messageCollectionConfig.time / 1000).toFixed(2)} ${
	messageCollectionConfig.time / 1000 === 1 ? 'second' : 'seconds'
}.`;
const filter = (response, message) => response.author.id === message.author.id;
module.exports = { errorTimeoutMessage, messageCollectionConfig, commandTimeoutMessage, filter };
