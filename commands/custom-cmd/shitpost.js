const Commando = require('discord.js-commando');
const respond = require('./respond');

module.exports = class ShitpostCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'shitpost',
			memberName: 'shitpost',
			aliases: ['shitpost'],
			group: 'greetings',
			description: 'Send a shitpost.',
			argsType: 'single',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}
	run = async (message, args) => respond(message, args, this.client, this.name);
};
