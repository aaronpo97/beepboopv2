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
const beanChat = require('./beanChat');

client.on('ready', () => initializeApp(client));
client.on('message', message => {
	automod(message);
	beanChat(message);
});
client.on('channelDelete', channel => checkDeletedChannel(channel));
client.on('guildCreate', guild => registerGuild(guild));
client.on('guildDelete', guild => unregisterGuild(guild));

client.login(process.env.BOT_TOKEN);
