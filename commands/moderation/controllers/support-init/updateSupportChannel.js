const collectMessageContent = require('../../utilities/collectMessageContent.js');

module.exports = async (message, queriedServerInfo) => {
	try {
		// FIRST QUESTION
		const questionOne = `A support channel is already registered. Would you like to update the information? (Yes/No)`;
		const firstConfirmation = await collectMessageContent(message, questionOne);
		if (firstConfirmation !== 'yes') throw new Error();

		// SECOND QUESTION
		const questionTwo = `The support channel is: <#${queriedServerInfo.supportChannelID}>. Is this correct? (Yes/No)`;
		const secondConfirmation = await collectMessageContent(message, questionTwo);
		if (secondConfirmation !== 'no') throw new Error();

		// THIRD QUESTION
		const questionThree = 'Please indicate the new support channel. (#channel)';
		const updatedSupportChannel = await collectMessageContent(message, questionThree);
		if (!updatedSupportChannel) throw new Error();

		// FOURTH QUESTION
		const questionFour = `You chose: ${updatedSupportChannel}. Please confirm this is the channel you want. (Yes/No)`;
		const thirdConfirmation = await collectMessageContent(message, questionFour);
		if (thirdConfirmation !== 'yes') throw new Error();

		// UPDATE SUPPORT CHANNEL
		message.channel.send(`Great! The support channel is now ${updatedSupportChannel} `);
		queriedServerInfo.supportChannelID = updatedSupportChannel.slice(2, -1);
		await queriedServerInfo.save();
	} catch (error) {
		message.channel.send('Error: ' + (error.message || 'Command aborted.'));
	}
};
