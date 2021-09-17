const Commando = require('discord.js-commando');
const respond = require('./respond');

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
	run = async (message, args) => respond(message, args, this.client, this.name);
};
