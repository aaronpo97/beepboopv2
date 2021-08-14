const ServerInfo = require('../schemas/ServerInfo');
const registerGuild = async (guild) => {
	const { id: guildID, name } = guild;

	const addedServer = new ServerInfo({
		name,
		guildID,
		supportChannelID: null,
		filterChannel: {
			filterChannelID: null,
			filter: null,
		},
	});

	await addedServer.save();
	return addedServer;
};

module.exports = registerGuild;
