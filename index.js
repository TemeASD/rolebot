const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');

// Custom requires
const { clientId, token, channelId } = require('./config.json');

const roleManager = require('./libs/rolemanager.js');
const userManager = require('./libs/usermanager.js');
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
	console.info('client.once: ready!')
});

client.on("messageCreate", function (message) {
	console.log('GOT A MESSAGE')
	if (message.author.bot && message.author.id === '788492942259781669') {
		console.log('GOT A MESSAGE SENT BY US!');
		/*THE BOT HAS NOW SENT THE ROLE CREATE MESSAGE APPROPRIATELY*/
		/*MOVE COMMITTING THE ROLES-EMOJIS STATE HERE SINCE HERE IS WHERE WE GET THE MESSAGE.ID THEY BELONG TO*/
		roleManager.addMessageIdToEmojis(message.id)
		let roles = roleManager.getRolesOfLastCommand();
		roleManager.clearRolesOfLastCommand(roles)
		for (const role of roles) {
			message.react(role.emoji_name);
		}
		messageManager.setBotMessages(message);
		return
	};
	if (message.channel.type === ('dm' || 'group')) return; //* ignores messages outside of channels
	if (message.content.toLowerCase().includes('\`')) return; //* ignores messages with code blocks
});

client.on('messageReactionAdd', async (reaction, user) => {
	for (message of messageManager.getBotMessages()) {
		if (message.id === reaction.message.id) {
			if (await utils.checkIfCorrectEmote(roleManager.getRoles(), reaction)) { userManager.addRoleToUser(reaction, user); }
		}
	}
	return
});

client.on('messageReactionRemove', async (reaction, user) => {
	for (message of messageManager.getBotMessages()) {
		if (message.id === reaction.message.id) {
			if (await utils.checkIfCorrectEmote(roleManager.getRoles(), reaction)) { userManager.removeRoleFromUser(reaction, user); }
		}
	}
	return
})

client.on('interactionCreate', async (interaction) => {
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
});

client.login(token);
