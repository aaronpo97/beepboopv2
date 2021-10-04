const collectMessageContent = require('../../utilities/collectMessageContent.js');

module.exports = async (message, queriedServerInfo) => {
	try {
		let ctr = 0;
		let max = 5;
		let exitLoop = false;

		// QUESTION ONE
		const questionOne = 'Please choose a channel to be used for the filter chat.';
		let filterChannel = await collectMessageContent(message, questionOne);
		if (!filterChannel) {
			message.channel.send('Command aborted.');
			exitLoop = true;
			return;
		}

		while (!exitLoop) {
			//TODO - add some sort of checker to see if it's a valid channel
			if (ctr > 0) {
				filterChannel = await collectMessageContent(message, questionOne);
				if (!filterChannel) {
					message.channel.send('Command aborted.');
					exitLoop = true;
					return;
				}
			}
			// QUESTION TWO
			const questionTwo = `You chose: ${filterChannel}. Is that correct? (yes/no)`;
			const confirmation = await collectMessageContent(message, questionTwo);
			if (!confirmation) {
				message.channel.send('Command aborted.');
				exitLoop = true;
				return;
			}
			if (confirmation === 'yes' || confirmation === 'y') {
				exitLoop = true;
			}
			if (ctr === max) {
				message.channel.send('Command aborted.');
				exitLoop = true;
				return;
			}
			ctr++;
		}
		const filterChannelID = filterChannel.slice(2, -1);

		// ASSIGN FILTER PHRASE
		let exitLoopTwo = false;
		const filterInputQuestion = 'Please indicate a filter phrase phrased to be used for the filter chat.';
		let filterPhrase = await collectMessageContent(message, filterInputQuestion);
		let ctrTwo = 0;

		if (!filterPhrase) {
			message.channel.send('Command aborted.');
			exitLoopTwo = true;
			return;
		}

		while (!exitLoopTwo) {
			//TODO - add some sort of checker to see if it's a valid channel
			if (ctrTwo > 0) {
				filterPhrase = await collectMessageContent(message, filterInputQuestion);
				if (!filterPhrase) {
					message.channel.send('Command aborted.');
					exitLoopTwo = true;
					return;
				}
			}

			const filterConfirmationQuestion = `You chose: ${filterPhrase}. Is that correct? (yes/no)`;
			const confirmation = await collectMessageContent(message, filterConfirmationQuestion);
			if (!confirmation) {
				message.channel.send('Command aborted.');
				exitLoopTwo = true;
				return;
			}
			if (confirmation === 'yes' || confirmation === 'y') {
				exitLoopTwo = true;
			}
			if (ctrTwo === max) {
				message.channel.send('Command aborted.');
				exitLoopTwo = true;
				return;
			}
			ctrTwo++;
		}

		message.channel.send(`Great! The filter channel will be ${filterChannel}, with the filter phrase \`${filterPhrase}\``);
		queriedServerInfo.filterChannel = { filterChannelID, filterPhrase };
		await queriedServerInfo.save();
	} catch (error) {
		message.channel.send('Error: ' + (error.message || 'Command aborted.'));
	}
};
