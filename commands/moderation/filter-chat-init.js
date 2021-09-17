const Commando = require('discord.js-commando');
const ServerInfo = require('../../database/schemas/ServerInfo');

const intializeFilterChat = require('./controllers/filter-chat-init/initializeFilterChat');
// const { messageCollectionConfig } = require('./utilities/collectorUtil');

module.exports = class InitFilterChatCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'filterchat-init',
			group: 'moderation',
			aliases: ['filterchat', 'filterchatinit'],
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

		let exitLoop = false;

		if (!queriedServerInfo.filterChannel.filterChannelID) {
			await intializeFilterChat(message, queriedServerInfo);
			exitLoop = true;
		}
		while (exitLoop === false) {
			const { filterChannelID, filter } = queriedServerInfo.filterChannel;
			message.channel.send(`Your filter chat is currently set to <#${filterChannelID}> with the filter: \`'${filter}'\``);
			message.channel.send(`Would you like to: \n [1] Change the channel, [2] Change the filter phrase., [3] Exit`);

			const updateCollector = await message.channel.awaitMessages(
				m => m.author.id === message.author.id,
				messageCollectionConfig
			);

			if (!updateCollector.first()) {
				throw new Error('Command aborted.');
			}

			const updateOption = updateCollector.first().content;
			switch (updateOption) {
				case '1': //change the channel
					message.channel.send('What channel do you want the filter chat to be set to?');
					const collectChannelUpdate = await message.channel.awaitMessages(
						m => m.author.id === message.author.id,
						messageCollectionConfig
					);

					const channelUpdate = collectChannelUpdate.first().content;
					const channelUpdateID = channelUpdate.slice(2, -1);

					queriedServerInfo.filterChannel = { filterChannelID: channelUpdateID, filter };
					await queriedServerInfo.save();
					console.log(queriedServerInfo);

					break;
				case '2': //change the filter phrase
					message.channel.send('');
					message.channel.send('u chose 2');

					break;
				case '3': // exit
					message.channel.send('command aborted');
					exitLoop = true;
				default:
					message.channel.send('Invalid entry.');
					exitLoop = false;
			}
		}
	}
};
