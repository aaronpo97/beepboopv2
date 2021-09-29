require('dotenv').config();
const { BOT_OWNER, BOT_PREFIX, BOT_TOKEN } = process.env;

const Commando = require('discord.js-commando');
const client = new Commando.CommandoClient({ owner: BOT_OWNER, commandPrefix: BOT_PREFIX });

const initializeApp = require('./initializeApp');
const automod = require('./automod');
const checkDeletedChannel = require('./database/utils/checkDeletedChannel');
const registerGuild = require('./database/utils/registerGuild');
const unregisterGuild = require('./database/utils/unregisterGuild');
const updateGuild = require('./database/utils/updateGuild');
const filterChat = require('./filterChat.js');

client.on('ready', () => initializeApp(client));
client.on('message', message => {
	automod(message, message.content);
	filterChat(message, message.content);
});
client.on('messageUpdate', message => {
	automod(message, message.reactions.message.content);
	filterChat(message, message.reactions.message.content);
});

client.on('channelDelete', channel => checkDeletedChannel(channel));
client.on('guildCreate', guild => registerGuild(guild));
client.on('guildDelete', guild => unregisterGuild(guild));
client.on('guildUpdate', (oldGuild, newGuild) => updateGuild(oldGuild, newGuild));

client.login(BOT_TOKEN);
