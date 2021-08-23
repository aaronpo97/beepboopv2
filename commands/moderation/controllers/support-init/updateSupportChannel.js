const { errorTimeoutMessage, config, commandTimeoutMessage, filter } = require('../../utilities/collectorUtil.js');

module.exports = async (message, queriedServerInfo) => {
	try {
		// FIRST QUESTION
		message.channel.send(`A support channel is already registered. Would you like to update the information? (Yes/No)` + commandTimeoutMessage);
		const collectFirstConfirmation = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectFirstConfirmation.first()) throw new Error(errorTimeoutMessage);
		const firstConfirmation = collectFirstConfirmation.first().content.toLowerCase();
		if (firstConfirmation !== 'yes') throw new Error();

		// SECOND QUESTION
		message.channel.send(`The support channel is: <#${queriedServerInfo.supportChannelID}>. Is this correct? (Yes/No)` + commandTimeoutMessage);
		const collectSecondConfirmation = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectSecondConfirmation.first()) throw new Error(errorTimeoutMessage);
		const secondConfirmation = collectSecondConfirmation.first().content.toLowerCase();
		if (secondConfirmation !== 'no') throw new Error();

		// THIRD QUESTION
		message.channel.send('Please indicate the new support channel. (#channel)' + commandTimeoutMessage);
		const collectChannelName = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectChannelName.first()) throw new Error(errorTimeoutMessage);
		const updatedSupportChannel = collectChannelName.first().content;

		// FOURTH QUESTION
		message.channel.send(`You chose: ${updatedSupportChannel}. Please confirm this is the channel you want. (Yes/No)` + commandTimeoutMessage);
		const collectThirdConfirmation = await message.channel.awaitMessages(response => filter(response, message), config);
		if (!collectThirdConfirmation.first()) throw new Error(errorTimeoutMessage);
		const thirdConfirmation = collectThirdConfirmation.first().content.toLowerCase();
		if (thirdConfirmation !== 'yes') throw new Error();

		// UPDATE SUPPORT CHANNEL
		message.channel.send(`Great! The support channel is now ${updatedSupportChannel} `);
		queriedServerInfo.supportChannelID = updatedSupportChannel.slice(2, -1);
		await queriedServerInfo.save();
	} catch (error) {
		message.channel.send('Error: ' + (error.message || 'Command aborted.'));
	}
};
