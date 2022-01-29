const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');

// Custom requires
const { clientId, token, channelId } = require('./config.json');
const emojis = require('./emojis.json');
const roleManager = require('./libs/rolemanager.js');
const messageManager = require('./libs/messagemanager.js')
const utils = require('./libs/utils.js');

messages = messageManager.getBotMessages();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


const client = new Client({
	intents:
		[Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER']
});

client.once('ready', async () => {
	client.commands = new Collection();
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name, command);
	}

	// Find out if we have already sent some messages
	try {
		const channel = await client.channels.fetch(channelId);
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

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.on('guildMemberUpdate', function (oldMember, newMember) {
	console.error(`a guild member changes - i.e. new role, removed role, nickname.`);
	console.log(oldMember, newMember)
});

client.login(token);
