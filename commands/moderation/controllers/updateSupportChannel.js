const { errorTimeoutMessage, messageCollectionConfig, commandTimeoutMessage } = require('./messageCollector.js');

module.exports = async (message, queriedServerInfo) => {
	try {
		message.channel.send(
			`A support channel is already registered. Would you like to update the information? (Yes/No)` + commandTimeoutMessage
		);

		const awaitQOne = await message.channel.awaitMessages((m) => m.author.id == message.author.id, messageCollectionConfig);

		if (!awaitQOne.first()) throw new Error(errorTimeoutMessage);
		if (awaitQOne.first().content !== 'yes') throw new Error();
		message.reply(
			`The support channel is: <#${queriedServerInfo.supportChannelID}>. Is this correct? (Yes/No)` + commandTimeoutMessage
		);

		const awaitQTwo = await message.channel.awaitMessages((m) => m.author.id == message.author.id, messageCollectionConfig);
		if (!awaitQTwo.first()) throw new Error(errorTimeoutMessage);
		if (awaitQTwo.first().content.toLowerCase() !== 'no') {
			throw new Error();
		}
		message.channel.send('Please indicate the new support channel. (#channel)' + commandTimeoutMessage);

		const awaitQThree = await message.channel.awaitMessages((m) => m.author.id == message.author.id, messageCollectionConfig);
		if (!awaitQThree.first()) throw new Error(errorTimeoutMessage);

		const updatedSupportChannel = awaitQThree.first().content;
		message.channel.send(
			`You chose: ${updatedSupportChannel}. Please confirm this is the channel you want. (Yes/No)` + commandTimeoutMessage
		);

		const awaitQFour = await message.channel.awaitMessages((m) => m.author.id == message.author.id, messageCollectionConfig);
		if (!awaitQFour) throw new Error(errorTimeoutMessage);
		if (awaitQFour.first().content.toLowerCase() === 'yes') {
			message.channel.send(`Great! The support channel is now ${updatedSupportChannel} `);
			queriedServerInfo.supportChannelID = updatedSupportChannel.slice(2, -1);
			await queriedServerInfo.save();
		} else throw new Error();
	} catch (error) {
		console.log(error.name);
		message.channel.send(error.message || 'Command aborted.');
	}
};
