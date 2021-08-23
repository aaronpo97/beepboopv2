const { config, filter, errorTimeoutMessage, commandTimeoutMessage } = require('../../utilities/collectorUtil');

module.exports = async (message, queriedServerInfo) => {
	try {
		// QUESTION ONE
		message.channel.send('You do not have a support channel assigned. Would you like to create one?' + commandTimeoutMessage);
		const collectFirstConfirmation = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectFirstConfirmation.first()) throw new Error(errorTimeoutMessage);
		const firstConfirmation = collectFirstConfirmation.first().content.toLowerCase();
		if (firstConfirmation !== ('yes' || 'y')) throw new Error();

		// QUESTION TWO
		message.channel.send('Awesome! What do you want to call the support channel?' + commandTimeoutMessage);
		const collectSupportChannelName = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectSupportChannelName.first()) throw new Error(errorTimeoutMessage);
		const supportChannelName = collectSupportChannelName.first().content.toLowerCase();

		// QUESTION THREE
		message.channel.send(`The support channel will be called: \`${supportChannelName}\`. Is that okay? (yes/no)` + commandTimeoutMessage);
		const collectSecondConfirmation = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectSecondConfirmation.first()) throw new Error(errorTimeoutMessage);
		const secondConfirmation = collectSecondConfirmation.first().content.toLowerCase();
		if (secondConfirmation !== ('yes' || 'y')) throw new Error();

		// CREATE SUPPORT CHANNEL
		const supportChannel = await message.guild.channels.create(supportChannelName, { type: 'text' });
		await message.channel.send(`Created a channel called: ${supportChannelName}`);
		queriedServerInfo.supportChannelID = supportChannel.id;
	} catch (error) {
		message.channel.send('Error: ' + (error.message || 'Command aborted.'));
	}
	await queriedServerInfo.save();
};
