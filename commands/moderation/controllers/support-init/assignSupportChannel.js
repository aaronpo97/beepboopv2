const collectMessageContent = require('../../utilities/collectMessageContent.js');

module.exports = async (message, queriedServerInfo, client) => {
	try {
		let ctr = 0;
		let max = 5;

		let exitLoop = false;

		// QUESTION ONE
		const questionOne = 'Please reply with a channel to be used for support messages. (#channel)';
		let supportChannel = await collectMessageContent(message, questionOne);
		if (!supportChannel) {
			message.channel.send('Command aborted.');
			exitLoop = true;
			return;
		}

		while (!exitLoop) {
			//TODO - add some sort of checker to see if it's a valid channel

			if (ctr > 0) {
				supportChannel = await collectMessageContent(message, questionOne);
				if (!supportChannel) {
					message.channel.send('Command aborted.');
					exitLoop = true;
					return;
				}
			}
			// QUESTION TWO
			if (ctr === max) {
				message.channel.send('Command aborted.');
				return true;
			}

			const questionTwo = `You chose: ${supportChannel}. Is that correct? (yes/no)`;
			const confirmation = await collectMessageContent(message, questionTwo);
			if (!confirmation) {
				message.channel.send('Command aborted.');
				return true;
			}

			if (confirmation === 'yes' || confirmation === 'y') {
				exitLoop = true;
			}
			ctr++;
		}

		// ASSIGN SUPPORT CHANNEL
		message.channel.send(`Awesome! The support channel is now: ${supportChannel}`);
		const supportChannelID = supportChannel.slice(2, -1);
		queriedServerInfo.supportChannelID = supportChannelID;
		await queriedServerInfo.save();

		const supportChannelChoice = client.channels.cache.find(channel => channel.id === supportChannelID);
		supportChannelChoice.send('Support channel assigned.');
	} catch (error) {
		message.channel.send('Error: ' + (error.message || 'Command aborted.'));
	}
};
