const mongoose = require('mongoose');
const { Schema } = mongoose;

const serverSchema = new Schema({
	name: String,
	guildID: String,
	supportChannelID: String,
	filterChannel: Object,
	filter: String,
	members: Number,
});

const ServerInfo = mongoose.model('Server', serverSchema);

module.exports = ServerInfo;
