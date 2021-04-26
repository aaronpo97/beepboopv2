const Commando = require('discord.js-commando');
const response = require('./response.json');

module.exports = class NiceCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'nice',
			memberName: 'nice',
			aliases: ['compliment'],
			group: 'greetings',
			description: 'Compliment yourself, or someone else in a selected channel.',
			argsType: 'single',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}
	async run(message, args) {
		const channelID = args.slice(2, -1);
		const sendToChannel = this.client.channels.cache.find((channel) => channel.id === channelID);
		const responseNum = Math.floor(Math.random() * response.compliments.length);
		const responseToSend = response.compliments[responseNum];
		if (!sendToChannel) {
			message.channel.send(responseToSend);
		} else {
			sendToChannel.send(responseToSend);
			await message.react('✅');
		}
	}
};
