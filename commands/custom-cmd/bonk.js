const Commando = require('discord.js-commando');
const responseHandler = require('./responseHandler');

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

	run = async (message, args) => {
		responseHandler(message, args, this.client, this.name);
		bonk(message);
	};
};
