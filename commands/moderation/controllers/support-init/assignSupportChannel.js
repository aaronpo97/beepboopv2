const collectMessageContent = require('../../utilities/collectMessageContent.js');

module.exports = async (message, queriedServerInfo) => {
	try {
		let ctr = 0;
		let max = 5;

		let exitLoop = false;

		// QUESTION ONE
		const questionOne = 'Please reply with a channel to be used for support messages. (#channel)';
		let supportChannel = await collectMessageContent(message, questionOne);
		if (!supportChannel) throw new Error();

		while (!exitLoop) {
			//TODO - add some sort of checker to see if it's a valid channel

			if (ctr > 0) {
				supportChannel = await collectMessageContent(message, questionOne);
				if (!supportChannel) throw new Error();
			}
			// QUESTION TWO
			const questionTwo = `You chose: ${supportChannel}. Is that correct? (yes/no)`;
			const confirmation = await collectMessageContent(message, questionTwo);
			if (confirmation === ('yes' || 'y')) {
				exitLoop = true;
			}

			if (ctr === max) {
				message.channel.send('Command aborted.');
				return;
			}
			ctr++;
		}
		// ASSIGN SUPPORT CHANNEL
		message.channel.send(`Awesome! The support channel is now: ${supportChannel}`);
		const supportChannelID = supportChannel.slice(2, -1);
		queriedServerInfo.supportChannelID = supportChannelID;
		await queriedServerInfo.save();
	} catch (error) {
		message.channel.send('Error: ' + (error.message || 'Command aborted.'));
	}
};
