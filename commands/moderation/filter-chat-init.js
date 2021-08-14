const Commando = require('discord.js-commando');
const ServerInfo = require('../../database/schemas/ServerInfo');

const intializeFilterChat = require('./controllers/initializeFilterChat');
const { messageCollectionConfig } = require('./controllers/messageCollector');

module.exports = class InitSupportCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'filterchat-init',
			group: 'moderation',
			aliases: ['filterchat'],
			memberName: 'filterchat-init',
			description: 'Initialize the filter chat command.',
			argsType: 'single',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,
		});
	}
	async run(message) {
		const queriedServerInfo = await ServerInfo.findOne({ guildID: message.guild.id });
		if (!queriedServerInfo) {
			message.channel.send(
				'Your server has not been intialized with the database. This process normally happens once I join your server. To fix this, please run command `db-init`.'
			);
			return;
		}

		const { filterChannelID } = queriedServerInfo.filterChannel;

		if (!filterChannelID) {
			await intializeFilterChat(message, queriedServerInfo);
		}

		message.channel.send(
			`You already have a filter chat. Would you like to: \n [1] Change the channel, or [2] Change the filter phrase.`
		);
		const updateCollector = await message.channel.awaitMessages((m) => m.author.id === message.author.id, messageCollectionConfig);

		const updateOption = updateCollector.first().content;

		if (updateOption !== '1' || updateOption !== '2') {
			throw new Error();
		}
	}
};
