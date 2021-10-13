## YerbBot is a general purpose Discord bot developed by Aaron Po.

# How to use:

## Step 1: Installation

This README assumes that you have both Node and MongoDB installed on your computer. If that is not the case, please follow the instructions listed on each respective website to install this on your machine.

```
Node: https://nodejs.org/en/download/
MongoDB: https://docs.mongodb.com/guides/server/install/
```

To quickly install all required files on your computer run the following commands in your terminal.

```bash
git clone https://github.com/aaronpo97/beepboopv2/
cd beepboopv2
npm i
```

## Step 2: Registering a bot account with discord:

To create a bot account with discord, please follow the following instructions found on:

```
https://discordjs.guide/preparations/setting-up-a-bot-application.html
```

## Step 3: Create a `.env` file to store the following bot information (these are your environment variables for configuration).

How to find user id: `https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-`
okens)

```env
BOT_OWNER=500486702024884234

BOT_PREFIX=b!

BOT_TOKEN=1234abcd
BOT_TOKEN_DEBUG=1234abcd

MONGO_SERVER_LINK=1234abcd
MONGO_SERVER_LINK_DEBUG=1234abcd

CURRENCY_API_KEY=1234abcd

BANNED_WORDS="your, banned, words, go, here"
```

## Step 4

Run the following commands in your terminal to run the bot locally on your machine.

```bash
npm start
```
