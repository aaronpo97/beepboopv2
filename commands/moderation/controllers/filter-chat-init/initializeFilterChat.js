const assignFilterChat = require('./controllers/assignFilterChat');
const createFilterChat = require('./controllers/createFilterChat');
const collectMessageContent = require('../../utilities/collectMessageContent');
module.exports = async (message, queriedServerInfo) => {
	let exitLoop = false;
	let ctr = 0;
	const max = 5;

	while (!exitLoop) {
		const initQuestion =
			'Would you like to:\n\n**[1]** Create a filter channel.\n**[2]** Assign a filter channel.\n**[3]** Exit';
		const collectUserChoice = await collectMessageContent(message, initQuestion);

		if (!collectUserChoice) {
			message.channel.send('Command aborted.');
			exitLoop = true;
			return;
		}
		const userChoice = collectUserChoice;

		switch (userChoice) {
			case '1':
				const choiceOne = await createFilterChat(message, queriedServerInfo);
				exitLoop = choiceOne ? true : false;

				break;
			case '2':
				const choiceTwo = await assignFilterChat(message, queriedServerInfo);
				exitLoop = choiceTwo ? true : false;
				break;
			case '3':
				message.channel.send('Command aborted.');
				exitLoop = true;
				break;
			default:
				message.channel.send('Invalid option.');
				break;
		}
		ctr++;
		if (ctr === max) {
			message.channel.send('Command aborted.');
			exitLoop = true;
		}
	}
};
