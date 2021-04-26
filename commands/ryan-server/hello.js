const Commando = require('discord.js-commando');
const response = require('./response');

module.exports = class HelloCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'hello',
			memberName: 'hello',
			aliases: ['hi'],
			group: 'greetings',
			description: 'Say hello to yourself, or someone else in a selected channel.',
			argsType: 'single',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}
	async run(message, args) {
		const channelID = args.slice(2, -1);
		const sendToChannel = this.client.channels.cache.find(
			channel => channel.id === channelID
		);
		const responseNum = Math.floor(Math.random() * response.hello.length);
		const responseToSend = response.hello[responseNum];
		if (!sendToChannel) {
			message.channel.send(responseToSend);
		} else {
			sendToChannel.send(responseToSend);
			await message.react('✅');
		}
	}
};
