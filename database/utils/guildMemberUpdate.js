const ServerInfo = require('../schemas/ServerInfo');

module.exports = async member => {
	const queriedServerInfo = await ServerInfo.findOne({ guildID: member.guild.id });
	const { memberCount } = member.guild;

	if (!memberCount) return;
	queriedServerInfo.stats.memberCount = memberCount;
	await queriedServerInfo.save;
};
