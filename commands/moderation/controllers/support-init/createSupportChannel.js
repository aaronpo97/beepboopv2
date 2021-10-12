const collectMessageContent = require('../../utilities/collectMessageContent');
const Discord = require('discord.js');
const getChannelName = require('../getChannelName');
module.exports = async (message, queriedServerInfo) => {
	try {
		const questionOne = 'You selected: **[1]** Create support channel. Is that what you wanted? (yes/no)';
		const confirmFirstChoice = await collectMessageContent(message, questionOne);
		if (!confirmFirstChoice) true; //bypass previous loop
		if (!(confirmFirstChoice === 'yes' || confirmFirstChoice === 'y')) {
			return false;
		}

		const channelNameChoice = await getChannelName(message, 'support channel');
		if (!channelNameChoice) return true; //abort command and bypass previous loop

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

		return true;
		//
	} catch (error) {
		message.channel.send(error.message);
	}
};
