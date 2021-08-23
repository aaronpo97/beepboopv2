const Commando = require('discord.js-commando');
const response = require('./response.json');

module.exports = class ShitPostCommand extends Commando.Command {
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
	async run(message, args) {
		const channelID = args.slice(2, -1);
		const sendToChannel = this.client.channels.cache.find((channel) => channel.id === channelID);
		const responseNum = Math.floor(Math.random() * response.compliments.length);

		const responseToSend = `DID🙈 YOU 🧏🏾‍♂️SEE👀 OMG⁉️

ONLYFANS💋 IS🧐 STARTING ▶️TO 🙀 REMOVE 🙅🏻‍♂️EXPLICIT🔞 CONTENT🥲

I 💁🏼knew🤧 my🙋🏼‍♂️ gut🤰 was😔 right👉🏾. I 🙈knew 😫other 😑sites💻 were 🤔 better🥲 and🙃 onlyfans💋 was 🥺just 😧the😒 commercial🤑, there💩 is 🅰️reason🧐 most 💯 people🙍🏼 in the sex🌚🌝 industry I follow📲 or know do onlyfans🌝🌚 in conjunction🤳 with other things🛹🛴🦽🦼🚲 (which is a lot of admin 🖥️and acting🦹🦸🧟🧛🏾‍♂️🧙 even if just selling videos 💸💵💴💶 or being a stripper 💃or going on dates 👩‍❤️‍👨🍜omg😱)
My feeling🙋🏼 was "if I'm not ready🙅🏿‍♀️ to act 💃🕺🏾👯‍♀️and do that admin 👨🏻‍💻and run multiple sites🖥️💻📱📲🔌 not just an onlyfans 🤑I'm not gonna make enough💸💵💴💶💷💳 or make it worthwhile 😮‍💨 it will become a pain"💔😔🥲`;

		if (!sendToChannel) {
			message.channel.send(responseToSend);
		} else {
			sendToChannel.send(responseToSend);
			await message.react('✅');
		}
	}
};
