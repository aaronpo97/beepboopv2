const collectMessageContent = require('../../utilities/collectMessageContent.js');

module.exports = async (message, queriedServerInfo) => {
	try {
		const questionOne = 'You selected: **[1]** Create filter channel. Is that what you wanted? (yes/no)';
		const confirmFirstChoice = await collectMessageContent(message, questionOne);
		if (!confirmFirstChoice) return;
		if (!(confirmFirstChoice === 'yes' || confirmFirstChoice === 'y')) {
			return;
		}

		let exitLoop = false;
		let channelNameChoice = '';
		let counterOne = 0;
		const max = 5;

		while (!exitLoop) {
			const questionTwo = 'What do you want to call the filter channel? (*Your channel name here*)';
			channelNameChoice = await collectMessageContent(message, questionTwo);
			if (!channelNameChoice) {
				return message.channel.send('Command aborted.');
			}

			if (channelNameChoice.includes('<') || channelNameChoice.includes('#')) {
				message.channel.send('Invalid name.');
				counterOne++;

				if (counter === max) {
					return message.channel.send('Command aborted.');
				}
				continue;
			}

			channelNameChoice = channelNameChoice.replaceAll(' ', '-');

			const questionThree = `The filter channel will be called: \`${channelNameChoice}\`. Is that okay? (yes/no)`;
			const confirmSecondChoice = await collectMessageContent(message, questionThree);

			if (!confirmSecondChoice) {
				return message.channel.send('Command aborted.');
			}

			if (confirmSecondChoice === 'yes' || confirmSecondChoice === 'y') {
				exitLoop = true;
			}

			if (counterOne === max) {
				return message.channel.send('Command aborted.');
			}
			counter++;
		}

		let exitLoopTwo = false;
		let filterPhrase = '';
		let counterTwo = 0;

		while (!exitLoopTwo) {
			const questionFour = 'What do you want the filter phrase to be?';
			filterPhrase = await collectMessageContent(message, questionFour);

			if (!filterPhrase) {
				message.channel.send('Command aborted.');
				return;
			}

			const questionFive = `The filter will be ${filterPhrase}. Is that okay? (yes/no)`;
			const confirmFilterPhrase = await collectMessageContent(message, questionFive);

			if (!confirmFilterPhrase) return;
			if (confirmFilterPhrase === 'yes' || confirmFilterPhrase === 'y') {
				exitLoopTwo = true;
			}

			if (counterTwo === max) {
				message.channel.send('Command aborted.');
				return;
			}

			counterTwo++;
		}

		const filterChannel = await message.guild.channels.create(channelNameChoice, {
			type: 'text',
			permissionOverwrites: [
				{
					id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
					deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Deny permissions
				},
			],
		});

		await message.channel.send(`Created a channel called: ${channelNameChoice}`);
		queriedServerInfo.filterChannel = { filterChannelID: filterChannel.id, filterPhrase };
		await queriedServerInfo.save();

		filterChannel.send(filterPhrase);
		//
	} catch (error) {
		message.channel.send(error.message);
	}
};
