const collectMessageContent = require('../../utilities/collectMessageContent');
module.exports = async (message, queriedServerInfo) => {
	// QUESTION 1
	const questionOne = 'You have no filter channel. Would you like to set one up?';
	const confirmationOne = await collectMessageContent(message, questionOne);
	if (confirmationOne !== 'yes') throw new Error();

	// QUESTION 2
	const questionTwo = 'Please choose a channel to be used for the filter chat.';
	const filterChannel = await collectMessageContent(message, questionTwo);

	// QUESTION 3
	const questionThree = `You chose: ${filterChannel}. Is that correct? (yes/no)`;
	const confirmationTwo = await collectMessageContent(message, questionThree);
	if (confirmationTwo !== 'yes') throw new Error();

	// QUESTION 4
	const questionFour = 'Awesome! Please choose a filter phrase.';
	const filterPhrase = await collectMessageContent(message, questionFour);

	// QUESTION 5
	const questionFive = `You chose the phrase: '${filterPhrase}'. Is that correct? `;
	const confirmationThree = await collectMessageContent(message, questionFive);
	if (confirmationThree !== 'yes') throw new Error();

	// ASSIGN FILTER CHAT
	const filterChannelID = filterChannel.slice(2, -1);
	message.channel.send(`Awesome. The filter chat will be ${filterChannel}, and the filter phrase will be '${filterPhrase}'.`);
	queriedServerInfo.filterChannel = { filterChannelID, filter: filterPhrase };
	await queriedServerInfo.save();
};
