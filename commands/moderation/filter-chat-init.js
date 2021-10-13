const Commando = require('discord.js-commando');
const ServerInfo = require('../../database/schemas/ServerInfo');

const assignFilterChat = require('./controllers/filter-chat-init/assignFilterChat');
const createFilterChat = require('./controllers/filter-chat-init/createFilterChat');

const collectMessageContent = require('./utilities/collectMessageContent');

const changeChannel = require('./controllers/filter-chat-init/changeChannel');
const changeFilterPhrase = require('./controllers/filter-chat-init/changeFilterPhrase');
const resetFilterChat = require('./controllers/filter-chat-init/resetFilterChat');

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
						exitLoop = choiceOne ? true : false;

						break;
					case '2':
						const choiceTwo = await assignFilterChat(message, queriedServerInfo);
						exitLoop = choiceTwo ? true : false;
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
			message.channel.send(`There's already a filter chat.`);
			const confirmationQuestion = `Would you like to:\n[1] Change the channel\n[2] Change the filter phrase\n[3] Reset and delete filter chat [4] Exit`;
			const userChoice = await collectMessageContent(message, confirmationQuestion);
			if (!userChoice) return false;

			let exitLoop = false;
			let ctr = 0;

			while (exitLoop) {
				switch (userChoice) {
					case '1':
						const choiceOne = await changeChannel(message, queriedServerInfo);
						exitLoop = choiceOne ? true : false;
						break;
					case '2':
						const choiceTwo = await changeFilterPhrase(message, queriedServerInfo);
						exitLoop = choiceTwo ? true : false;
						break;
					case '3':
						const choiceThree = await resetFilterChat(message, queriedServerInfo);
						exitLoop = choiceThree ? true : false;
						break;
					case '4':
						message.channel.send('Command aborted.');

						exitLoop = choiceFour ? true : false;
					default:
						message.channel.send('Invalid option.');
						ctr++;
				}
			}
		}
	}
};
