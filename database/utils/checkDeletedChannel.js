const ServerInfo = require('../schemas/ServerInfo');
const checkDeletedChannel = async (channel) => {
	const { id: channelID } = channel;
	const { id: guildID } = channel.guild;

	const serverInfo = await ServerInfo.findOne({ guildID });
	if (!serverInfo) return;

	const { supportChannelID, filterChannel } = serverInfo;
	const { filterChannelID } = filterChannel;

	if (supportChannelID === channelID) {
		serverInfo.supportChannelID = null;
		await serverInfo.save();
	}
	if (filterChannelID === channelID) {
		serverInfo.filterChannel = {
			filterChannelID: null,
			filter: null,
		};
		await serverInfo.save();
	}
	return;
};

module.exports = checkDeletedChannel;
