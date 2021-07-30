//hfdsa

const filter = 'bean';
module.exports = async (message, content) => {
	try {
		if (message.author.bot || message.channel.id !== '821961323020943361') {
			return;
		}
		if (content.toLowerCase() !== filter) {
			setTimeout(() => message.delete(), 1500);
			const reply = await message.channel.send(
				`In this channel you are only allowed to say ${filter}.`
			);
			setTimeout(() => reply.delete(), 2500);
		}
	} catch (error) {
		console.error(error);
	}
};
