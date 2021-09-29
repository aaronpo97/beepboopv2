const Commando = require('discord.js-commando');
const responseHandler = require('./responseHandler');

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
	run = async (message, args) => responseHandler(message, args, this.client, this.name);
};
