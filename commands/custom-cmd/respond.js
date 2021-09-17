//this is the respone handler for each command.

const response = require('./response.json');

module.exports = async (message, args, client, type) => {
	const channelID = args.slice(2, -1);
	const sendToChannel = client.channels.cache.find(channel => channel.id === channelID);

	const responseNum = Math.floor(Math.random() * response[type].length);
	const responseToSend = response[type][responseNum];
	if (!sendToChannel) {
		message.channel.send(responseToSend);
	} else {
		sendToChannel.send(responseToSend);
		await message.react('✅');
	}
};
