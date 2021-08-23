const ServerInfo = require('../schemas/ServerInfo');
module.exports = async (oldGuild, newGuild) => {
	if (oldGuild.name === newGuild.name) return;
	console.log('A guild changed its name!');
	console.log(`'${oldGuild.name}' => '${newGuild.name}'`);
	const currentGuild = await ServerInfo.findOne({ guildID: oldGuild.id });
	if (!currentGuild) return;

	currentGuild.name = newGuild.name;
	await currentGuild.save();
};
