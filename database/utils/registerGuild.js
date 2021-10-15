const ServerInfo = require('../schemas/ServerInfo');
const registerGuild = async guild => {
	const { id: guildID, name, memberCount, ownerID } = guild;

	const addedServer = new ServerInfo({
		name,
		guildID,
		supportChannelID: null,
		filterChannel: {
			filterChannelID: null,
			filterPhrase: null,
		},
		stats: {
			memberCount,
			ownerID,
		},
	});

	await addedServer.save();
	return addedServer;
};

module.exports = registerGuild;
