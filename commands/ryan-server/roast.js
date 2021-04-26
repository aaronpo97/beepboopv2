const Commando = require('discord.js-commando');
const response = require('./response.json');

module.exports = class RoastCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'roast',
			memberName: 'roast',
			aliases: ['insult'],
			group: 'greetings',
			description: 'Roast yourself, or someone else in a selected channel',
			argsType: 'single',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}
	async run(message, args) {
		const channelID = args.slice(2, -1);
		const sendToChannel = this.client.channels.cache.find(channel => channel.id === channelID);
		const responseNum = Math.floor(Math.random() * response.roasts.length);
		const responseToSend = response.roasts[responseNum];
		if (!sendToChannel) {
			message.channel.send(responseToSend);
		} else {
			sendToChannel.send(responseToSend);
			await message.react('✅');
		}
	}
};
