const { messageCollectionConfig, filter } = require('../utilities/collectorUtil');

module.exports = async (message, queriedServerInfo) => {
	message.channel.send('You do not have a support channel assigned. Would you like to create one?');
	const collectFirstConfirmation = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
	const firstConfirmation = collectFirstConfirmation.first().content.toLowerCase();
	if (firstConfirmation !== ('yes' || 'y')) return;

	message.channel.send('Awesome! What do you want to call the support channel?');
	const collectSupportChannelName = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
	const supportChannelName = collectSupportChannelName.first().content.toLowerCase();

	message.channel.send(`The support channel will be called: \`${supportChannelName}\`. Is that okay? (yes/no)`);

	const collectSecondConfirmation = await message.channel.awaitMessages((response) => filter(response, message), messageCollectionConfig);
	const secondConfirmation = collectSecondConfirmation.first().content.toLowerCase();
	if (secondConfirmation !== ('yes' || 'y')) return;

	const supportChannel = await message.guild.channels.create(supportChannelName, { type: 'text' });
	await message.channel.send(`Creating a channel called: ${supportChannelName}`);

	queriedServerInfo.supportChannelID = supportChannel.id;
	await queriedServerInfo.save();
};
