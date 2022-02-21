const { SlashCommandBuilder } = require('@discordjs/builders');
const messageManager = require('../libs/messagemanager.js')
const roleManager = require('../libs/rolemanager.js')
const adminManager = require('../libs/usermanager.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poista-viesti')
    .setDescription('Poistaa viestin kanavan perusteella')
    .addChannelOption(option => option.setName('kanava').setDescription('Kanava, jonne viesti lähetetään')),

  async execute(interaction) {
    return interaction.reply({ content: 'Ei toiminnassa!', ephemeral: true });
    /*
    const channel = interaction.options.getChannel('kanava');

    if (!adminManager.isAnAdmin(interaction.user)) return interaction.reply({ content: `Et ole admin!`, ephemeral: true });
    if (channel === null) { return interaction.reply({ content: "Kanavan on pakollinen argumentti", ephemeral: true }); }
    messageManager.removeMessage(channel)*/
  },
};