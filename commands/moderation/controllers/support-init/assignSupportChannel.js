const { errorTimeoutMessage, config, commandTimeoutMessage, filter } = require('../../utilities/collectorUtil.js');

module.exports = async (message, queriedServerInfo) => {
	try {
		// QUESTION ONE
		message.channel.send('Please reply with a channel to be used for support messages. (#channel)' + commandTimeoutMessage);
		const collectChannelName = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectChannelName.first()) throw new Error(errorTimeoutMessage);
		const supportChannel = collectChannelName.first().content;

		// QUESTION TWO
		message.channel.send(`You chose: ${supportChannel}. Is that correct? (yes/no)` + commandTimeoutMessage);
		const collectConfirmation = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectConfirmation.first()) throw new Error(errorTimeoutMessage);
		const confirmation = collectConfirmation.first().content.toLowerCase();
		if (confirmation !== 'yes') throw new Error();

		// ASSIGN SUPPORT CHANNEL
		const supportChannelID = supportChannel.slice(2, -1);
		queriedServerInfo.supportChannelID = supportChannelID;
		await queriedServerInfo.save();
	} catch (error) {
		message.channel.send('Error: ' + (error.message || 'Command aborted.'));
	}
};
