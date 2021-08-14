require('dotenv').config();

const Commando = require('discord.js-commando');
const client = new Commando.CommandoClient({
	owner: process.env.BOT_OWNER,
	commandPrefix: process.env.BOT_PREFIX,
});

const initializeApp = require('./initializeApp');
const automod = require('./automod');
const checkDeletedChannel = require('./database/utils/checkDeletedChannel');
const registerGuild = require('./database/utils/registerGuild');
const unregisterGuild = require('./database/utils/unregisterGuild');
const filterChat = require('./filterChat.js');

client.on('ready', () => initializeApp(client));
client.on('message', (message) => {
	const content = message.content;
	automod(message);
	filterChat(message, content);
});
client.on('messageUpdate', (message) => {
	const { content } = message.reactions.message;
	filterChat(message, content);
});
client.on('channelDelete', (channel) => checkDeletedChannel(channel));
client.on('guildCreate', (guild) => registerGuild(guild));
client.on('guildDelete', (guild) => unregisterGuild(guild));

client.login(process.env.BOT_TOKEN);
