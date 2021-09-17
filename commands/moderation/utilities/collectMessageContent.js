const errorTimeoutMessage = 'The command timed out.';
const config = { max: 1, time: 5000 };
const cmdTimeoutMessage = `This command will timeout after ${(config.time / 1000).toFixed(2)} ${
	config.time / 1000 === 1 ? 'second' : 'seconds'
}.`;
const filter = (response, message) => response.author.id === message.author.id;

module.exports = async (message, messageToSend) => {
	if (!messageToSend) throw new Error('Could not collect message responses as you did not give a message to send.');

	message.channel.send(messageToSend + '\n' + cmdTimeoutMessage);
	const collector = await message.channel.awaitMessages(response => filter(response, message), config);
	if (!collector.first()) {
		message.channel.send(errorTimeoutMessage);
		return;
	}
	return collector.first().content.toLowerCase();
};
