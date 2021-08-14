//hfdsa
const ServerInfo = require('./database/schemas/ServerInfo');

module.exports = async (message, content) => {
	try {
		const currentGuild = await ServerInfo.findOne({ guildID: message.guild.id });

		if (!currentGuild) return;
		const { filterChannelID } = currentGuild.filterChannel;
		const { filter } = currentGuild.filterChannel;

		if (message.author.bot || message.channel.id !== filterChannelID || !filterChannelID) return;

		if (content.toLowerCase() !== filter) {
			setTimeout(() => message.delete(), 1500);
			const reply = await message.channel.send(`In this channel you're only allowed to say '${filter}'.`);
			setTimeout(() => reply.delete(), 2500);
		}
	} catch (error) {
		console.error(error);
	}
};
