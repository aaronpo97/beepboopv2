const Commando = require('discord.js-commando');

module.exports = class SendCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'send',
			memberName: 'send',
			aliases: ['say', 's', 'repeat'],
			group: 'greetings',
			description: 'Send a message to a different channel using the bot.',
			argsType: 'multiple',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}
	async run(message, args) {
		try {
			if (args.length === 0) throw new Error(`You didn't provide any arguments.`);

			const channelID = args.shift().slice(2, -1);
			if (!channelID) throw new Error('You did not include a channel name ya dingus');

			const sendToChannel = this.client.channels.cache.find(channel => channel.id === channelID);
			if (!sendToChannel) throw new Error('Invalid channel id.');

			const sendMessage = args.join(' ');
			if (!sendMessage) throw new Error('Cannot send blank message.');

			sendToChannel.send(sendMessage);
			await message.react('✅');
		} catch (error) {
			message.channel.send(`${error}`);
			await message.react('❌');
		}
	}
};
