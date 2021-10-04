require('dotenv').config();

const badWords = require('./bannedWords.js');

const findBannedWords = content => {
	for (i = 0; i < badWords.length; i++) {
		if (content.toLowerCase().includes(badWords[i].toLowerCase())) return true;
	}
};

const { BOT_OWNER } = process.env;

const automod = async (message, content) => {
	try {
		if (findBannedWords(content)) {
			const reason = 'Zero tolerance for racial slurs.';
			const target = message.author;
			const member = message.guild.members.cache.get(target.id);
			await message.delete();
			if (!member.bannable) {
				await message.channel.send(`There is zero tolerance for discrimination and verbal slurs.`);
			} else {
				await member.ban({ reason }); //refers to what messages to delete and what the ban reason is
				await message.channel.send(
					`There is zero tolerance for discrimination and verbal slurs. <@${target.id}> has been banned.`
				);
				await member.send(
					`You have been banned from ${message.guild.name} for using a blacklisted word. I am a bot and this action was done automatically. Please contact <@${BOT_OWNER}> if you have any concerns.`
				);
			}
		}
	} catch (error) {
		console.log(`Something went wrong:`, error);
	}
};

module.exports = automod;
