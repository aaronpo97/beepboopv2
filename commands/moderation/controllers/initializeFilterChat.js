const { errorTimeoutMessage, messageCollectionConfig, commandTimeoutMessage } = require('./messageCollector.js');
module.exports = async (message, queriedServerInfo) => {
	message.channel.send('You have no filter channel. Would you like to set one up?');
	const collectAnswer = await message.channel.awaitMessages((m) => m.author.id == message.author.id, messageCollectionConfig);

	if (!collectAnswer.first()) throw new Error(errorTimeoutMessage);
	if (collectAnswer.first().content.toLowerCase() !== 'yes') {
		throw new Error();
	}

	message.channel.send('Please choose a channel to be used for the filter chat.');
	const collectChannelChoice = await message.channel.awaitMessages((m) => m.author.id === message.author.id, messageCollectionConfig);

	const filterChannel = collectChannelChoice.first().content;

	message.channel.send(`You chose: ${filterChannel}. Is that correct? (yes/no)`);
	const collectConfirmationOne = await message.channel.awaitMessages((m) => m.author.id === message.author.id, messageCollectionConfig);
	if (collectConfirmationOne.first().content !== 'yes') {
		throw new Error();
	}

	message.channel.send('Awesome! Please choose a filter phrase.');
	const filterPhraseCollection = await message.channel.awaitMessages((m) => m.author.id === message.author.id, messageCollectionConfig);

	const filterPhrase = filterPhraseCollection.first().content;
	message.channel.send(`You chose the phrase: '${filterPhrase}'. Is that correct? `);

	const collectConfirmationTwo = await message.channel.awaitMessages((m) => m.author.id === message.author.id, messageCollectionConfig);

	if (collectConfirmationTwo.first().content !== 'yes') {
		throw new Error();
	}

	message.channel.send(`Awesome. The filter chat will be ${filterChannel}, and the filter phrase will be '${filterPhrase}'.`);

	const filterChannelID = filterChannel.slice(2, -1);
	queriedServerInfo.filterChannel = { filterChannelID, filter: filterPhrase };

	await queriedServerInfo.save();
};
