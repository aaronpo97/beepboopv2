require('dotenv').config();
const { BOT_OWNER, BANNED_WORDS } = process.env;
const blacklistedWords = BANNED_WORDS.split(', ');

const findBannedWords = content => {
	for (let blacklistedWord of blacklistedWords) {
		if (content.toLowerCase().includes(blacklistedWord.toLowerCase())) return true;
	}
};

const automod = async (message, content) => {
	try {
		if (findBannedWords(content)) {
			const reason = 'Zero tolerance for racial slurs.';
			const target = message.author;
			const member = message.guild.members.cache.get(target.id);

			setTimeout(async () => {
				await message.delete();
			}, 2000);

			if (!member.bannable) {
				await message.channel.send(`There is zero tolerance for discrimination and verbal slurs.`);
				await member.send(
					`You have used a blacklisted word. The message containing the word has been deleted. I am a bot and this action was done automatically.`
				);
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
