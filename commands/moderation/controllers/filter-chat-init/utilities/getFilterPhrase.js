const timeoutAbortMessage = require('../../../utilities/timeoutAbortMessage');
const collectMessageContent = require('../../../utilities/collectMessageContent');

module.exports = async message => {
	let exit = false;
	let filterPhrase = '';
	let ctr = 0;
	const max = 5;

	while (!exit) {
		const questionFour = 'What do you want the filter phrase to be?';
		const getFilterPhrase = await collectMessageContent(message, questionFour);
		if (!getFilterPhrase) return timeoutAbortMessage(message);

		filterPhrase = getFilterPhrase;
		const questionFive = `The filter will be ${filterPhrase}. Is that okay? (yes/no)`;
		const confirmFilterPhrase = await collectMessageContent(message, questionFive);

		if (!confirmFilterPhrase) return;
		if (confirmFilterPhrase === 'yes' || confirmFilterPhrase === 'y') exit = true;

		if (ctr === max) {
			message.channel.send('Command aborted.');
			return true;
		}

		ctr++;
	}

	return filterPhrase;
};
