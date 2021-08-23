const ServerInfo = require('../../../database/schemas/ServerInfo');
const { errorTimeoutMessage, messageCollectionConfig, commandTimeoutMessage } = require('../utilities/collectorUtil.js');

module.exports = async (message) => {
	try {
		message.channel.send(
			'To initialize the support command, reply with a channel to be used for support messages. (#channel)' + commandTimeoutMessage
		);
		const collectA1 = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
		if (!collectA1.first()) throw new Error(errorTimeoutMessage);
		const supportChannel = collectA1.first().content;

		if (supportChannel[0] !== '<' && supportChannel[1] !== '#') {
			throw new Error(`You did not provide a valid channel name. (eg. '#channel'). Command aborted.`);
		}
		message.channel.send(`You have chosen: ${supportChannel}. Is that correct? (yes/no)` + commandTimeoutMessage);

		const collectAnswer = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
		if (!collectAnswer) throw new Error(errorTimeoutMessage);
		if (collectAnswer.first().content.toLowerCase() === 'yes') {
			const supportChannelID = supportChannel.slice(2, -1);
			const serverToEdit = await ServerInfo.findOne({ guildID: message.guild.id });
			serverToEdit.supportChannelID = supportChannelID;
			await serverToEdit.save();

			message.channel.send(`Your server is now registered in our database with the following information:`);
			await message.channel.send(`Guild Name: ${message.guild.name}, Guild ID: ${message.guild.id}, Support Channel: <#${supportChannelID}>`);
		} else {
			message.channel.send('Command aborted.');
		}
	} catch (error) {
		message.channel.send('Error: ' + error.message || 'Command aborted.');
	}
};
