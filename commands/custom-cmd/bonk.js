const Commando = require('discord.js-commando');
const response = require('./response.json');

const bonk = async message => {
	await message.react('😳');
	await message.react('🇧'); // B emoji
	await message.react('🇴'); // O emoji
	await message.react('🇳'); // N emoji
	await message.react('🇰'); // K emoji
};

module.exports = class HelloCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'bonk',
			memberName: 'bonk',
			group: 'greetings',
			description: 'Bonk.',
			argsType: 'single',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}
	async run(message, args) {
		const channelID = args.slice(2, -1);
		const sendToChannel = this.client.channels.cache.find(channel => channel.id === channelID);
		const responseNum = Math.floor(Math.random() * response.bonk.length);
		const responseToSend = response.bonk[responseNum];
		if (!sendToChannel) {
			message.channel.send(responseToSend);
			await bonk(message);
		} else {
			sendToChannel.send(responseToSend);
			await message.react('✅');
			bonk(message);
		}
	}
};
