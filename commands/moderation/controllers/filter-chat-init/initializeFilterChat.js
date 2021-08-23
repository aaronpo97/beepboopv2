const { errorTimeoutMessage, config, commandTimeoutMessage, filter } = require('../../utilities/collectorUtil');
module.exports = async (message, queriedServerInfo) => {
	// QUESTION 1
	message.channel.send('You have no filter channel. Would you like to set one up?');
	const collectConfirmationOne = await message.channel.awaitMessages(response => filter(response, message), config);
	if (!collectConfirmationOne.first()) throw new Error(errorTimeoutMessage);
	const confirmationOne = collectConfirmationOne.first().content.toLowerCase();
	if (confirmationOne !== 'yes') throw new Error();

	// QUESTION 2
	message.channel.send('Please choose a channel to be used for the filter chat.');
	const collectChannelChoice = await message.channel.awaitMessages(response => filter(response, message), config);
	if (!collectChannelChoice.first()) throw new Error();
	const filterChannel = collectChannelChoice.first().content;

	// QUESTION 3
	message.channel.send(`You chose: ${filterChannel}. Is that correct? (yes/no)`);
	const collectConfirmationTwo = await message.channel.awaitMessages(response => filter(response, message), config);
	if (!collectConfirmationTwo.first()) throw new Error(errorTimeoutMessage);
	const confirmationTwo = collectConfirmationTwo.first().content.toLowerCase();
	if (confirmationTwo !== 'yes') throw new Error();

	// QUESTION 4
	message.channel.send('Awesome! Please choose a filter phrase.');
	const collectFilterPhrase = await message.channel.awaitMessages(response => filter(response, message), config);
	if (!collectFilterPhrase.first()) throw new Error();
	const filterPhrase = collectFilterPhrase.first().content;

	// QUESTION 5
	message.channel.send(`You chose the phrase: '${filterPhrase}'. Is that correct? `);
	const collectConfirmationThree = await message.channel.awaitMessages(response => filter(response, message), config);
	if (!collectConfirmationThree.first()) throw new Error();
	const confirmationThree = collectConfirmationThree.first().content.toLowerCase();
	if (confirmationThree !== 'yes') throw new Error();

	// ASSIGN FILTER CHAT
	const filterChannelID = filterChannel.slice(2, -1);
	message.channel.send(`Awesome. The filter chat will be ${filterChannel}, and the filter phrase will be '${filterPhrase}'.`);
	queriedServerInfo.filterChannel = { filterChannelID, filter: filterPhrase };
	await queriedServerInfo.save();
};
