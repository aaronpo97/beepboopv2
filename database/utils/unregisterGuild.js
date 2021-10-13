const ServerInfo = require('../schemas/ServerInfo');
module.exports = async guild => await ServerInfo.deleteMany({ guildID: guild.id });
