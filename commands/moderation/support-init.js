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
			let ctr = 0;
			const max = 5;

			while (!exitLoop) {
				const initQuestion =
					'Would you like to:\n\n**[1]** Create a support channel.\n**[2]** Assign a channel for support messages.\n**[3]** Exit';
				const collectUserChoice = await collectMessageContent(message, initQuestion);

				if (!collectUserChoice) {
					message.channel.send('Command aborted.');
					exitLoop = true;
					return;
				}
				const userChoice = collectUserChoice;

				switch (userChoice) {
					case '1':
						const choiceOne = await createSupportChannel(message, queriedServerInfo);
						if (choiceOne) {
							exitLoop = true;
						}

						break;
					case '2':
						const choiceTwo = await assignSupportChannel(message, queriedServerInfo, this.client);
						if (choiceTwo) {
							exitLoop = true;
						}

						break;
					case '3':
						message.channel.send('Command aborted.');
						exitLoop = true;
						break;
					default:
						message.channel.send('Invalid option.');
						break;
				}
				ctr++;
				if (ctr === max) {
					message.channel.send('Command aborted.');
					exitLoop = true;
				}
			}
		} else {
			await updateSupportChannel(message, queriedServerInfo, this.client);
		}
	}
};
