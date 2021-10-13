const ServerInfo = require('../schemas/ServerInfo');
const registerGuild = async guild => {
	const { id: guildID, name, memberCount: members } = guild;

	const addedServer = new ServerInfo({
		name,
		guildID,
		supportChannelID: null,
		filterChannel: {
			filterChannelID: null,
			filter: null,
		},
		members,
	});

	await addedServer.save();
	return addedServer;
};

module.exports = registerGuild;
