module.exports = message => {
	message.channel.send('Command aborted.');
	return false; // this allows the user to bypass the initial loop from initializeFilterChat.js
};
