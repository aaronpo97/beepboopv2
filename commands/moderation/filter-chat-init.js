const Commando = require('discord.js-commando');
const ServerInfo = require('../../database/schemas/ServerInfo');

const initializeFilterChat = require('./controllers/filter-chat-init/initializeFilterChat');
const updateOrDeleteFilterChat = require('./controllers/filter-chat-init/updateOrDeleteFilterChat');

module.exports = class InitFilterChatCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'filterchat-init',
			group: 'moderation',
			aliases: ['filterchat', 'filterchatinit', 'fci'],
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
			return message.channel.send(
				'Your server has not been intialized with the database. This process normally happens once I join your server. To fix this, please run command `db-init`.'
			);
		}
		const { filterChannelID } = queriedServerInfo.filterChannel;

		if (!filterChannelID) {
			initializeFilterChat(message, queriedServerInfo);
		} else {
			updateOrDeleteFilterChat(message, queriedServerInfo);
		}
	}
};
