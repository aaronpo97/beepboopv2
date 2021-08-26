const errorTimeoutMessage = 'The command timed out. Please try again.';
const config = { max: 1, time: 15000 };
const cmdTimeoutMessage = `\nThis command will timeout after ${(config.time / 1000).toFixed(2)} ${
	config.time / 1000 === 1 ? 'second' : 'seconds'
}.`;
const filter = (response, message) => response.author.id === message.author.id;

module.exports = async (message, messageToSend) => {
	if (!messageToSend) throw new Error('There was no message to send.');

	message.channel.send(messageToSend + cmdTimeoutMessage);
	const collector = await message.channel.awaitMessages(response => filter(response, message), config);
	if (!collector.first()) throw new Error(errorTimeoutMessage);
	return collector.first().content.toLowerCase();
};
