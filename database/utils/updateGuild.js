require('colors');
const ServerInfo = require('../schemas/ServerInfo');
module.exports = async (oldGuild, newGuild) => {
	if (oldGuild.name === newGuild.name) return;
	console.log('A guild changed its name!'.yellow);
	console.log(`'${oldGuild.name}' => '${newGuild.name}'`);
	const currentGuild = await ServerInfo.findOne({ guildID: oldGuild.id });
	if (!currentGuild) {
		console.log('That server was not registered in the database. No changes were made.');
		return;
	}

	currentGuild.name = newGuild.name;
	await currentGuild.save();
};
