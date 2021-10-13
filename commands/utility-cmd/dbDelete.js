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
			message.channel.send('Could not delete server from database as it has not been initialized.');
			return;
		}
		await unregisterGuild(message.guild);

		console.log(`A server was removed from the database:`);
		message.channel.send(`Your server is now removed from the database.`);
	}
};
