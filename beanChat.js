//hfdsa

const filter = 'bean';
module.exports = async message => {
	try {
		if (message.author.bot || message.channel.id !== '821961323020943361') {
			return;
		}
		if (message.content !== filter) {
			setTimeout(() => message.delete(), 4000);
			const reply = await message.channel.send(`In this channel you are only allowed to say ${filter}.`);
			setTimeout(() => reply.delete(), 6000);
		}
	} catch (error) {
		console.error(error);
	}
};
