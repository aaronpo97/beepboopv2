const deleteFilterChat = require('./controllers/deleteFilterChat');
const collectMessageContent = require('../../utilities/collectMessageContent');
module.exports = async (message, queriedServerInfo) => {
	let exitLoop = false;
	let ctr = 0;

	while (!exitLoop) {
		const confirmationQuestion = `You already have a filter chat. Would you like to\n**[1]** Delete filter chat.\n**[2]** Exit.`;
		const userChoice = await collectMessageContent(message, confirmationQuestion);
		if (!userChoice) return;

		switch (userChoice) {
			case '1':
				const choiceOne = await deleteFilterChat(message, queriedServerInfo);
				exitLoop = choiceOne ? true : false;
				break;
			case '2':
				message.channel.send('Command aborted.');
				exitLoop = true;
				break;
			default:
				message.channel.send('Invalid option.');
		}

		ctr++;
		if (ctr === 5) return message.channel.send('Command aborted.');
	}
};
