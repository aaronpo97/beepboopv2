const collectMessageContent = require('../../utilities/collectMessageContent');
const Discord = require('discord.js');
module.exports = async (message, queriedServerInfo) => {
	try {
		const questionOne = 'You selected: **[1]** Create support channel. Is that what you wanted? (yes/no)';
		const confirmFirstChoice = await collectMessageContent(message, questionOne);
		if (!confirmFirstChoice) return;
		if (!(confirmFirstChoice === 'yes' || confirmFirstChoice === 'y')) {
			message.channel.send('Command aborted.');
			return;
		}

		let exitLoop = false;
		let channelNameChoice = '';
		let counter = 0;
		const max = 5;

		while (!exitLoop) {
			const questionTwo = 'What do you want to call the support channel? (*Your channel name here*)';
			channelNameChoice = await collectMessageContent(message, questionTwo);
			if (!channelNameChoice) {
				message.channel.send('Command aborted.');
				return;
			}

			const questionThree = `The support channel will be called: \`${channelNameChoice}\`. Is that okay? (yes/no)`;
			const confirmSecondChoice = await collectMessageContent(message, questionThree);
			if (!confirmSecondChoice) {
				message.channel.send('Command aborted.');
				return;
			}

			if (confirmSecondChoice === 'yes' || confirmSecondChoice === 'y') exitLoop = true;

			if (counter === max) {
				message.channel.send('Command aborted.');
				return;
			}
			counter++;
		}

		const supportChannel = await message.guild.channels.create(channelNameChoice, {
			type: 'text',
			permissionOverwrites: [
				{
					id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
					deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Deny permissions
				},
			],
		});

		await message.channel.send(`Created a channel called: ${channelNameChoice}`);
		queriedServerInfo.supportChannelID = supportChannel.id;
		await queriedServerInfo.save();

		const supportChannelEmbed = new Discord.MessageEmbed()
			.setTitle('Mod Help')
			.addFields({
				name: `Mod ticket channel:`,
				value: `Created by ${message.author} in ${message.channel}.`,
				inline: true,
			})
			.setTimestamp()
			.setFooter(message.guild.name);

		supportChannel.send(supportChannelEmbed);
		//
	} catch (error) {
		message.channel.send(error.message);
	}
};
