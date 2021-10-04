//hfdsa
const ServerInfo = require('./database/schemas/ServerInfo');

module.exports = async (message, content) => {
	try {
		if (!message.guild) return;
		const currentGuild = await ServerInfo.findOne({ guildID: message.guild.id });

		if (!currentGuild) return;
		if (!currentGuild.filterChannel) return;

		const { filterChannelID } = currentGuild.filterChannel;
		const { filterPhrase } = currentGuild.filterChannel;

		if (!filterPhrase) return;

		if (message.author.bot || message.channel.id !== filterChannelID || !filterChannelID) return;

		if (content.toLowerCase() !== filterPhrase) {
			setTimeout(() => message.delete(), 1500);
			const reply = await message.channel.send(`In this channel you're only allowed to say '${filterPhrase}'.`);
			setTimeout(() => reply.delete(), 2500);
		}
	} catch (error) {
		console.error(error);
	}
};
