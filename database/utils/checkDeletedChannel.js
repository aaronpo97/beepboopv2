const ServerInfo = require('../schemas/ServerInfo');
require('colors');

const checkDeletedChannel = async channel => {
	const { id: channelID } = channel;
	const { id: guildID } = channel.guild;

	console.log(
		`A channel by the name of: '${channel.name.yellow}' (id: ${channelID.yellow}) got deleted in ${channel.guild.name.blue}.`
	);

	const serverInfo = await ServerInfo.findOne({ guildID });
	if (!serverInfo) return;

	const { supportChannelID, filterChannel } = serverInfo;
	const { filterChannelID } = filterChannel;

	if (supportChannelID === channelID) {
		console.log(`That channel was a support channel. Resetting the support channel for ${channel.guild.name.blue}.`);
		serverInfo.supportChannelID = null;
		await serverInfo.save();
	}
	if (filterChannelID === channelID) {
		console.log(`That channel was a filter channel. Resetting the filter channel for ${channel.guild.name.blue}.`);
		serverInfo.filterChannel = {
			filterChannelID: null,
			filter: null,
		};
		await serverInfo.save();
	}

	console.log('\n');
	return;
};

module.exports = checkDeletedChannel;
