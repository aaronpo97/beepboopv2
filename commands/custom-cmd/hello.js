const Commando = require('discord.js-commando');
const respond = require('./respond');

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
	run = async (message, args) => respond(message, args, this.client, this.name);
};
