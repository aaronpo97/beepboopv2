const collectMessageContent = require('../../../utilities/collectMessageContent.js');
const getChannelName = require('../../getChannelName');
const getFilterPhrase = require('../utilities/getFilterPhrase');

module.exports = async (message, queriedServerInfo) => {
	try {
		//User confirms choice:
		const questionOne = 'You selected: **[1]** Create filter channel. Is that what you wanted? (yes/no)';

		const confirmFirstChoice = await collectMessageContent(message, questionOne);
		if (!confirmFirstChoice) return true; //abort function and bypass previous loop
		if (!(confirmFirstChoice === 'yes' || confirmFirstChoice === 'y')) return false; // return to menu and go back to original loop

		const channelName = await getChannelName(message, 'filter channel');
		if (!channelName) return true; //abort function and bypass previous loop
		const filterPhrase = await getFilterPhrase(message);
		if (!filterPhrase) return true; //abort function and bypass previous loop

		// Create filter channel here:
		const filterChannel = await message.guild.channels.create(channelName, { type: 'text' });
		const filterChannelID = filterChannel.id;

		queriedServerInfo.filterChannel = { filterChannelID, filterPhrase };
		await queriedServerInfo.save();
		await message.channel.send(`Created a channel called: ${channelName} with the filter phrase: ${filterPhrase}`);

		//send the first message to the filter channel
		filterChannel.send(filterPhrase);

		// once everything worked and the command is completed, abort function and bypass previous loop.
		return true;
	} catch (error) {
		message.channel.send(error.message + error.stack);
	}
};
