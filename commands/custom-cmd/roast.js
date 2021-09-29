const Commando = require('discord.js-commando');
const responseHandler = require('./responseHandler');

module.exports = class RoastCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'roast',
			memberName: 'roast',
			aliases: ['insult'],
			group: 'greetings',
			description: 'Roast yourself, or someone else in a selected channel.',
			argsType: 'single',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}
	run = async (message, args) => responseHandler(message, args, this.client, this.name);
};
