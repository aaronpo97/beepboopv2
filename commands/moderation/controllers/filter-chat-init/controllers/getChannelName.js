const timeoutAbortMessage = require('../../../utilities/timeoutAbortMessage');
const collectMessageContent = require('../../../utilities/collectMessageContent');

module.exports = async (message, channelType = 'stuff') => {
	try {
		let ctr = 0;
		let exit = false;
		let channelName = '';
		const max = 5;

		while (!exit) {
			if (ctr === max) {
				message.channel.send('Command aborted.');
				return false;
			} // bypass the loop and abort code

			const question = `What do you want to call the ${channelType}? (*Your channel name here*)`;
			const chooseChannelName = await collectMessageContent(message, question);
			if (!chooseChannelName) return timeoutAbortMessage(message); //returns false
			if (chooseChannelName.includes('<') || chooseChannelName.includes('#')) {
				if (ctr === max) return timeoutAbortMessage(message);
				message.channel.send('Invalid name.');
				ctr++;
				continue;
			}
			channelName = chooseChannelName.replaceAll(' ', '-');

			const confirmQuestion = `The ${channelType} will be called: \`${channelName}\`. Is that okay? (yes/no)`;
			const confirmName = await collectMessageContent(message, confirmQuestion);
			if (!confirmName) return timeoutAbortMessage(message);
			if (confirmName === 'yes' || confirmName === 'y') exit = true;

			ctr++;
		}

		return channelName;
	} catch (error) {
		message.channel.send(error + error.stack);
		return false;
	}
};
