const Commando = require('discord.js-commando');
const response = require('./response.json');

module.exports = class GoodbyeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'goodbye',
			aliases: ['bye'],
			group: 'greetings',
			memberName: 'bye',
			description: 'Say bye to yourself, or someone else in a selected channel.',
			argsType: 'single',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}
	async run(message, args) {
		const channelID = args.slice(2, -1);
		const sendToChannel = this.client.channels.cache.find((channel) => channel.id === channelID);
		const responseNum = Math.floor(Math.random() * response.goodbye.length);
		const responseToSend = response.goodbye[responseNum];
		if (!sendToChannel) message.channel.send(responseToSend);
		else {
			sendToChannel.send(responseToSend);
			await message.react('✅');
		}
	}
};
