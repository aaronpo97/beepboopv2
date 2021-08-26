const collectMessageContent = require('../../utilities/collectMessageContent');

module.exports = async (message, queriedServerInfo) => {
	try {
		const questionOne = 'You selected: **[1]** Create support channel. Is that what you wanted? (yes/no)';
		const confirmFirstChoice = await collectMessageContent(message, questionOne);
		if (!(confirmFirstChoice === 'yes' || confirmFirstChoice === 'y')) throw new Error();

		const questionTwo = 'Awesome! What do you want to call the support channel? (*Your channel name here*)';
		const supportChannelName = await collectMessageContent(message, questionTwo);
		if (!supportChannelName) throw new Error();

		const questionThree = `The support channel will be called: \`${supportChannelName}\`. Is that okay? (yes/no)`;
		const confirmSecondChoice = await collectMessageContent(message, questionThree);
		if (!(confirmSecondChoice === 'yes' || confirmSecondChoice === 'y')) throw new Error();

		const supportChannel = await message.guild.channels.create(supportChannelName, { type: 'text' });
		await message.channel.send(`Created a channel called: ${supportChannelName}`);
		queriedServerInfo.supportChannelID = supportChannel.id;
		await queriedServerInfo.save();
		//
	} catch (error) {
		message.channel.send('Error: ' + (error.message || 'Command aborted.') + error.stack);
	}
};
