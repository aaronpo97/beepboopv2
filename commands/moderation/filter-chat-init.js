const Commando = require('discord.js-commando');
const ServerInfo = require('../../database/schemas/ServerInfo');

const assignFilterChat = require('./controllers/filter-chat-init/assignFilterChat');
const createFilterChat = require('./controllers/filter-chat-init/createFilterChat');

const collectMessageContent = require('./utilities/collectMessageContent');
// const { messageCollectionConfig } = require('./utilities/collectorUtil');

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
			message.channel.send(
				'Your server has not been intialized with the database. This process normally happens once I join your server. To fix this, please run command `db-init`.'
			);
			return;
		}
		const { filterChannelID } = queriedServerInfo.filterChannel;

		if (!filterChannelID) {
			let exitLoop = false;
			let ctr = 0;
			const max = 5;

			while (!exitLoop) {
				const initQuestion =
					'Would you like to:\n\n**[1]** Create a filter channel.\n**[2]** Assign a filter channel.\n**[3]** Exit';
				const collectUserChoice = await collectMessageContent(message, initQuestion);

				if (!collectUserChoice) {
					message.channel.send('Command aborted.');
					exitLoop = true;
					return;
				}
				const userChoice = collectUserChoice;

				switch (userChoice) {
					case '1':
						const choiceOne = await createFilterChat(message, queriedServerInfo);
						if (choiceOne) {
							exitLoop = true;
						}

						break;
					case '2':
						const choiceTwo = await assignFilterChat(message, queriedServerInfo);
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
			// await updateFilterChannel(message, queriedServerInfo, this.client);

			console.log(queriedServerInfo);
		}
	}
};
