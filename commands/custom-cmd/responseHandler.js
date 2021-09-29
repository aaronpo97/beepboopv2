//this is the respone handler for each command.

const responses = require('./responses.json');

module.exports = async (message, args, client, type) => {
	const channelID = args.slice(2, -1);
	const sendToChannel = client.channels.cache.find(channel => channel.id === channelID);

	const responseNum = Math.floor(Math.random() * responses[type].length);
	const responseToSend = responses[type][responseNum];
	if (!sendToChannel) {
		message.channel.send(responseToSend);
	} else {
		sendToChannel.send(responseToSend);
		await message.react('✅');
	}
};
