const Commando = require('discord.js-commando');
const ServerInfo = require('../../database/schemas/ServerInfo');
const assignSupportChannel = require('./controllers/support-init/assignSupportChannel');
const updateSupportChannel = require('./controllers/support-init/updateSupportChannel');
const createSupportChannel = require('./controllers/support-init/createSupportChannel');

module.exports = class InitSupportCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'support-init',
			group: 'moderation',
			aliases: ['sup-init'],
			memberName: 'support-init',
			description: 'Initialize the support command.',
			argsType: 'single',
			clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
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
		const { supportChannelID } = queriedServerInfo;

		if (!supportChannelID) {
			await assignSupportChannel(message, queriedServerInfo);
			// await createSupportChannel(message, queriedServerInfo);
		} else {
			await updateSupportChannel(message, queriedServerInfo);
		}
	}
};
