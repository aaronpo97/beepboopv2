const { errorTimeoutMessage, messageCollectionConfig, commandTimeoutMessage, filter } = require('../utilities/collectorUtil.js');

module.exports = async (message, queriedServerInfo) => {
	try {
		message.channel.send(`A support channel is already registered. Would you like to update the information? (Yes/No)` + commandTimeoutMessage);

		// FIRST QUESTION
		const collectFirstConfirmation = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
		if (!collectFirstConfirmation.first()) {
			throw new Error(errorTimeoutMessage);
		}
		const firstConfirmation = collectFirstConfirmation.first().content.toLowerCase();
		if (firstConfirmation !== 'yes') {
			throw new Error();
		}

		// SECOND QUESTION
		message.reply(`The support channel is: <#${queriedServerInfo.supportChannelID}>. Is this correct? (Yes/No)` + commandTimeoutMessage);
		const collectSecondConfirmation = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
		if (!collectSecondConfirmation.first()) {
			throw new Error(errorTimeoutMessage);
		}
		const secondConfirmation = collectSecondConfirmation.first().content.toLowerCase();
		if (secondConfirmation !== 'no') {
			throw new Error();
		}

		// THIRD QUESTION
		message.channel.send('Please indicate the new support channel. (#channel)' + commandTimeoutMessage);

		const collectChannelName = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
		if (!collectChannelName.first()) {
			throw new Error(errorTimeoutMessage);
		}
		const updatedSupportChannel = awaitQThree.first().content;

		// FOURTH QUESTION
		message.channel.send(`You chose: ${updatedSupportChannel}. Please confirm this is the channel you want. (Yes/No)` + commandTimeoutMessage);

		const collectThirdConfirmation = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
		if (!collectThirdConfirmation.first()) {
			throw new Error(errorTimeoutMessage);
		}
		const thirdConfirmation = collectThirdConfirmation.first().content.toLowerCase();

		if (thirdConfirmation !== 'yes') {
			throw new Error();
		}
		message.channel.send(`Great! The support channel is now ${updatedSupportChannel} `);
		queriedServerInfo.supportChannelID = updatedSupportChannel.slice(2, -1);
		await queriedServerInfo.save();

		//
	} catch (error) {
		message.channel.send(error.message || 'Command aborted.');
	}
};
