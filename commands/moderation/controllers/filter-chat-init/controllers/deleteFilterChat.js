module.exports = async (message, queriedServerInfo) => {
	message.channel.send('Deleting filter chat. Rerun `b!filterchatinit` to create a new filter chat if desired.');
	queriedServerInfo.filterChannel = { filterChannelID: null, filterPhrase: null };
	await queriedServerInfo.save();
	return true;
};
