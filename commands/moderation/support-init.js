const Commando = require('discord.js-commando');
const ServerInfo = require('../../database/schemas/ServerInfo');
const assignSupportChannel = require('./controllers/support-init/assignSupportChannel');
const updateSupportChannel = require('./controllers/support-init/updateSupportChannel');
const createSupportChannel = require('./controllers/support-init/createSupportChannel');

const collectMessageContent = require('./utilities/collectMessageContent');

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
			let exitLoop = false;
			while (!exitLoop) {
				const questionOne =
					'Would you like to: **[1]** Create a support channel, or **[2]** Assign a channel for support messages **(1 or 2)**?';
				const collectUserChoice = await collectMessageContent(message, questionOne);
				const userChoice = collectUserChoice;

				switch (userChoice) {
					case '1':
						await createSupportChannel(message, queriedServerInfo);
						exitLoop = true;
						break;
					case '2':
						await assignSupportChannel(message, queriedServerInfo);
						exitLoop = true;
						break;
					default:
						break;
				}
			}
		} else {
			await updateSupportChannel(message, queriedServerInfo);
		}
	}
};
