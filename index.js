const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');

// Custom requires
const { clientId, token } = require('./config.json');
const emojis = require('./emojis.json');
const roleManager = require('./libs/rolemanager.js');
const messageManager = require('./libs/messagemanager.js')
const utils = require('./libs/utils.js');

messages = messageManager.getBotMessages();

const client = new Client({
	intents:
		[Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.once('ready', async () => {
	// Find out if we have already sent some messages
	try {
		const channel = await client.channels.fetch("272444401530306560");
		if (messages[0] === undefined) {
			await messageManager.sendBotMessages(client, channel);
			messages = await messageManager.getBotMessages();
			console.log(messages)
		}
	} catch {
		console.log('fucked')
	}
	for (message of messages) {
		console.log(`we have a message ${message.id}`)
	}
});

client.on("messageCreate", function (message) {
	if (message.author.bot && message.author.id === clientId) {
		console.log('make sure that its our own message');
		for (emoji in emojis) {
			message.react(emojis[emoji].emoji_name);
		}
		messageManager.setBotMessages(message);
		return
	};
	if (message.channel.type === ('dm' || 'group')) return; //* ignores messages outside of channels
	if (message.content.toLowerCase().includes('\`')) return; //* ignores messages with code blocks
});

client.on('messageReactionAdd', async (reaction, user) => {
	for (message of messages) {
		if (message.id === reaction.message.id) {
			if (await utils.checkIfCorrectEmote(emojis, reaction)) { roleManager.addRole(reaction, user); }
		}
	}
	return
});

client.on('messageReactionRemove', async (reaction, user) => {
	if (await utils.checkIfCorrectEmote(emojis, reaction)) { roleManager.removeRole(reaction, user); }
	return
})


client.login(token);
