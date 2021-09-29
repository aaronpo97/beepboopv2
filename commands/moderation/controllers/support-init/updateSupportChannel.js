const collectMessageContent = require('../../utilities/collectMessageContent.js');

module.exports = async (message, queriedServerInfo, client) => {
	try {
		// FIRST QUESTION
		const questionOne = `A support channel is already registered. Would you like to update the information? (Yes/No)`;
		const firstConfirmation = await collectMessageContent(message, questionOne);
		if (!firstConfirmation) return;
		if (!(firstConfirmation === 'yes' || firstConfirmation === 'y')) {
			message.channel.send('Command aborted.');
			return;
		}

		// SECOND QUESTION
		const questionTwo = `The support channel is: <#${queriedServerInfo.supportChannelID}>. Would you like to change it? (Yes/No)`;
		const secondConfirmation = await collectMessageContent(message, questionTwo);
		if (!(secondConfirmation === 'yes' || secondConfirmation === 'y')) {
			message.channel.send('Command aborted.');
			return;
		}

		let exitLoop = false;
		let updatedChannelChoice = '';
		let ctr = 0;

		// to do - start loop here

		while (!exitLoop) {
			// THIRD QUESTION
			const questionThree = 'Please indicate the new support channel. (#channel)';
			updatedChannelChoice = await collectMessageContent(message, questionThree);
			if (!updatedChannelChoice) return;

			// FOURTH QUESTION
			const questionFour = `You chose: ${updatedChannelChoice}. Please confirm this is the channel you want. (Yes/No)`;
			const thirdConfirmation = await collectMessageContent(message, questionFour);
			if (!thirdConfirmation) return;
			if (thirdConfirmation === 'yes' || thirdConfirmation === 'y') {
				exitLoop = true;
			}
		}

		//end loop here

		// UPDATE SUPPORT CHANNEL
		message.channel.send(`Great! The support channel is now ${updatedChannelChoice} `);

		const supportChannelID = updatedChannelChoice.slice(2, -1);

		queriedServerInfo.supportChannelID = supportChannelID;
		await queriedServerInfo.save();

		const supportChannel = client.channels.cache.find(channel => channel.id === supportChannelID);

		supportChannel.send('Support channel updated.');
	} catch (error) {
		message.channel.send(error.stack);
	}
};
