const Commando = require('discord.js-commando');
const unregisterGuild = require('../../database/utils/unregisterGuild');
const ServerInfo = require('../../database/schemas/ServerInfo');
module.exports = class InitSupportCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'db-delete',
			group: 'utility',
			aliases: ['database-delete'],
			memberName: 'dbdelete',
			description: 'Delete database records.',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,
		});
	}
	async run(message) {
		const queriedServerInfo = await ServerInfo.findOne({ guildID: message.guild.id });
		if (!queriedServerInfo) {
			message.channel.send('Your server is not intialized with the database.');
			return;
		}
		const deletedGuild = await unregisterGuild(message.guild);

		message.channel.send(`Your server is now removed from the database.`);
	}
};
